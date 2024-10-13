import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { axiosSecure } from '../Reuses/useAxiosSecure';
import { ContextProvider } from '../Auths/User_Managemrnt_Context';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ totalAmmount, allCartData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [transiction, setTransiction] = useState('');
    const navigate = useNavigate();
    const { user } = useContext(ContextProvider);

    // Load the payment intent when component is mounted
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: totalAmmount || 1 }) // Ensure a valid price
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
            .catch(error => {
                console.error("Error creating payment intent", error);
                toast.error("Failed to initialize payment");
            });
    }, [totalAmmount]);

    // Handle storing payment information in the backend
    const handlePayment = async (paymentIntentId) => {
        const paymentData = {
            email: user?.email,
            name: user?.displayName,
            price: totalAmmount || 1, // Ensure price is valid
            date: new Date(),
            cartId: allCartData.map(x => x._id),
            food_details: [...allCartData],
            status: 'pending', // Initial status
            transId: paymentIntentId
        };
        console.log(paymentData);
        
        try {
            const { data } = await axiosSecure.post('/payments', paymentData);
            if (data) {
                toast.success('Payment Successful');
                navigate('/'); // Redirect to the homepage
            }
        } catch (error) {
            toast.error('Failed to store payment data');
            console.error('Error storing payment:', error);
        }
    };

    // Handle form submission for Stripe payment
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            toast.error('Stripe has not loaded yet!');
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) return;

        try {
            // Create Payment Method with the card element
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card,
                billing_details: {
                    name: user?.displayName || 'Anonymous',
                    email: user?.email || 'No-email',
                },
            });

            if (error) {
                toast.error('Payment method creation failed');
                console.error('Error:', error);
                return;
            }

            // Confirm payment with the client secret
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'Anonymous',
                        email: user?.email || 'No-email',
                    },
                },
            });

            if (confirmError) {
                toast.error('Payment confirmation failed');
                console.error('Error confirming payment:', confirmError);
                return;
            }

            // If payment succeeded, store the payment data
            if (paymentIntent.status === 'succeeded') {
                console.log('PaymentIntent:', paymentIntent);
                setTransiction(paymentIntent.id);
                
                // Call handlePayment to store the data
                await handlePayment(paymentIntent.id);
            }
        } catch (error) {
            toast.error('Payment failed');
            console.error('Error during payment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#9e2146' },
                    },
                }}
            />
            <div className="flex justify-center items-center p-4 my-4">
                <button className="btn btn-outline" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
