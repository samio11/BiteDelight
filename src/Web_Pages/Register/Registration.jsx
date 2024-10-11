import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import auth from '../../FirebaseStuffs/Frb';
import { imageUpload } from '../../Reuses/ImageApi';
import toast from 'react-hot-toast';
import { ContextProvider } from '../../Auths/User_Managemrnt_Context';
import { updateProfile } from 'firebase/auth';

const Registration = () => {
    const { emailPasswordRegister } = useContext(ContextProvider)
    const navigate = useNavigate()
    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0];
        // Upload Image
        const image_url = await imageUpload(image)

        // Validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error('Invalid Email');
            return;
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            toast.error('Invalid Password');
            return;
        }

        if (name === '') {
            toast.error('Name Field is required');
            return;
        }

        if (image_url === '') {
            toast.error('Image Field is required');
            return;
        }
        try {
            const { user } = await emailPasswordRegister(email, password)
            if (user) {
                try {
                    updateProfile(user, {
                        displayName: name,
                        photoURL: image_url
                    })
                    toast.success('User Successfully Registered')
                    form.reset()
                    navigate('/login')
                }
                catch (error) {
                    toast.error('Something Wrong in name and photo')
                    console.log('Name,Phone', error)
                }
            }
        }
        catch (error) {
            console.log(error)
            toast.error('Something Wrong in Registration')
        }

    }
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Helmet>
                <title>BiteDelight | Register</title>
            </Helmet>
            <div className="flex w-full flex-row-reverse max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div
                    className="hidden bg-cover lg:block lg:w-1/2"
                    style={{
                        backgroundImage: "url('https://t4.ftcdn.net/jpg/05/62/17/79/360_F_562177976_dH3SgNcJBPjkvonJIyBvemkNCvPfOEKB.jpg')",
                    }}
                ></div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <div className="flex justify-center mx-auto">
                        <img className="w-[50px] h-auto sm:h-8" src="https://png.pngtree.com/png-clipart/20221110/original/pngtree-health-restaurant-logo-design-template-vector-picture-image_3607709.png" alt="" />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                        <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">Register Now</a>

                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>

                    <form onSubmit={handleRegister}>

                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Name</label>
                            <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" name='name' />
                        </div>


                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Email Address</label>
                            <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" name='email' />
                        </div>

                        <input type="file" name='image' accept='image/*' className="file-input file-input-bordered w-full max-w-xs mt-4" />

                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Password</label>
                            </div>

                            <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" name='password' />
                        </div>

                        <div className="mt-6">
                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                Sign In
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                        <Link to={'/login'} className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign in</Link>

                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;