import React, { useContext, useEffect, useState } from 'react';
import { ContextProvider } from '../Auths/User_Managemrnt_Context';

const DetailedInfo = ({totalAmmount }) => {
    const { user } = useContext(ContextProvider)
    return (
        <div>
            {/* 1st Part */}
            <div className='w-full flex justify-center items-center'>
                {/* User Intro */}
                <div>
                    <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800">
                        <img src={user?.photoURL} alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                        <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                            <div className="my-2 space-y-1">
                                <h2 className="text-xl font-semibold sm:text-2xl">{user?.displayName}</h2>
                                <p className="px-5 text-xs sm:text-base dark:text-gray-600">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* Info about Table */}
            <div className='text-center text-2xl italic font-semibold my-5'>
                <h2>Total Payable Ammount:- <span className='text-blue-500'>{totalAmmount.toFixed(2)}$</span></h2>
            </div>
            {/* Table */}
           
        </div>
    );
};

export default DetailedInfo;