import React from 'react';
import CountUp from 'react-countup';

const FeatureBox = ({ title, Desc, icon: Icon }) => {
    return (
        <div className='w-full h-[150px] flex justify-center items-center bg-gradient-to-b from-gray-900 to-black text-white p-6 rounded-lg shadow-lg m-2'>
            <div className='text-center'>
               <div className='flex justify-center items-center'>
               <Icon className='w-12 h-12' />
               </div>
                <h2 className='mt-2 text-lg font-bold'>{title}</h2>
                <p className='mt-2 text-sm'><CountUp end={Desc} /></p>
            </div>
        </div>
    );
};

export default FeatureBox;