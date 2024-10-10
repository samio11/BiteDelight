import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const FixedElement = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-140px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default FixedElement;