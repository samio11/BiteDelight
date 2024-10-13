import React, { useContext, useState } from 'react';
import DetailedInfo from './DetailedInfo';
import { ContextProvider } from '../Auths/User_Managemrnt_Context';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
    const { user } = useContext(ContextProvider)
    const [totalAmmount, setTotalAmmount] = useState(0);
    //Stripe
    const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PULIC}`);

    const { data: cartData = [], isLoading, refetch: cartLoad } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/cartInfo/${user.email}`)
            setTotalAmmount(data?.reduce((x, y) => x + y.price, 0))
            return data
        }
    })
    const handleCartFoodDelete = async (id) => {
        console.log("Deleting item with ID:", id); // Check ID here
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/cartData/${id}`);
            if (data.deletedCount === 1) {
                console.log("Deleted:", data);
                toast.success('Product removed successfully');
                cartLoad();
            } else {
                console.log("Item not deleted:", data);
                toast.error('Failed to remove product');
            }
        } catch (error) {
            toast.error('Failed to remove product');
            console.error(error);
        }
    };

    return (
        <div>
            <div className='w-full h-auto flex justify-center items-center gap-4'>
                {/* Left */}
                <div className='flex-1 h-auto'>
                    <DetailedInfo totalAmmount={totalAmmount}></DetailedInfo>
                </div>
                {/* Right */}
                <div className='flex-1'>
                    {/* Stripe will implemented later */}
                    <div className='w-full my-5'>
                        {/* Yoo */}
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Food Name</th>
                                        <th>Food Price</th>
                                        <th>Food Rating</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {
                                        cartData.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <img className='w-[50px] h-[50px] rounded-xl' src={item.food_image} alt="" />
                                                </td>
                                                <td>
                                                    {item.food_name}


                                                </td>
                                                <td>{item.price}</td>
                                                <th>
                                                    {item.rating}
                                                </th>
                                                <th>
                                                    <button onClick={() => handleCartFoodDelete(item._id)} className='btn btn-outline btn-error'>Delete</button>
                                                </th>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-auto flex justify-center items-center'>
                <div className='w-[800px] h-auto bg-gradient-to-br from-white to-gray-100 p-6 rounded-lg shadow-md'>
                    <div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm allCartData={cartData} totalAmmount={totalAmmount} />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;