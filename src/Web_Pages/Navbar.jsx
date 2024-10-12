import React, { useContext, useEffect, useState } from 'react';
import { ContextProvider } from '../Auths/User_Managemrnt_Context';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { axiosSecure } from '../Reuses/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Navbar = () => {
    const { user, logOut } = useContext(ContextProvider)
    const [totalAmmount,setTotalAmmount] = useState(0);
    const navigate = useNavigate();
    // console.log(user)
    const {data:cartData= [],isLoading,refetch:cartLoad} = useQuery({
        queryKey: ['cart'],
        queryFn: async()=>{
           const {data} =await axios(`${import.meta.env.VITE_BACKEND_URL}/cartInfo/${user.email}`)
           return data
        }
    })
    // console.log(cartData)
    useEffect(()=>{
        if(cartData.length){
            setTotalAmmount(cartData.reduce((acc,curr)=>acc+curr.price,0))
            cartLoad()
        }
    },[])
    const handleLogOut = async () => {
        await logOut();
        try {
            const { data } = await axiosSecure('/remove_cookie')
            console.log(data)
            toast.success('Logged Out Successfully')
        }
        catch (error) {
            console.error(error)
            toast.error('Some Error happened in Logout')
        }

    }
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Item 1</a></li>

                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">BiteDelight</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Item 1</a></li>

                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                {/* I will implement later */}
                <div className="navbar-end">
                    {/* <a className="btn">Button</a> */}
                    {
                        user ? <>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span className="badge badge-sm indicator-item">{cartData.length || 0}</span>
                                    </div>
                                </div>
                                <div
                                    tabIndex={0}
                                    className="card card-compact dropdown-content bg-base-100 z-[50] mt-3 w-52 shadow">
                                    <div className="card-body">
                                        <span className="text-lg font-bold">Toal Items:- {cartData.length || 0}</span>
                                        <span className="text-info">Subtotal: ${totalAmmount.toFixed(2) || 0}</span>
                                        <div className="card-actions">
                                            <button onClick={()=>navigate('/payment')} className="btn btn-primary btn-block">Pay Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[50] mt-3 w-52 p-2 shadow space-y-2">
                                    <li>
                                        <a className="justify-between">
                                            {user?.displayName}
                                            {/* This will be update while useRole Implemented */}
                                            <span className="badge badge-secondary badge-outline">Guest</span>
                                        </a>
                                    </li>
                                    <li><Link to={'/'}>Home</Link></li>
                                    <li><Link to={'/payment'}>Abilable Pending  Payments</Link></li>

                                    <li><button onClick={handleLogOut} className='btn btn-outline'>Log Out</button></li>
                                </ul>
                            </div>
                        </> : <>
                            <button onClick={() => navigate('/login')} className='btn btn-outline'>Sign In</button>
                        </>
                    }

                </div>



            </div>
        </div>
    );
};

export default Navbar;