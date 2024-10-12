import React, { useState } from 'react';
import FeatureBox from '../../Reuses/FeatureBox';
import { IoMdPeople } from "react-icons/io";
import { IoStarOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import {
    useQuery,
  } from '@tanstack/react-query';
  import axios from 'axios';

const FeatureHome = () => {
    const {data:totalUser = 0,isLoading} = useQuery({
        queryKey: ['totalUser'],
        queryFn: async () => {
            const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/all-users`)
            return data.length
        }
    })
    const {data:averageRating = 0,isLoading:averageLoading} = useQuery({
        queryKey: ['averageRating'],
        queryFn: async()=>{
            const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/ratings`)
            const totalRating = data?.reduce((current,x)=>current+x.rating,0)
            const average = totalRating / data.length
           return average
        }
    })
    return (
        <div className='my-5 max-w-screen-xl mx-auto h-auto grid grid-cols-1 md:grid-cols-3 gap-5'>
            <FeatureBox title={'Total Happy Customers'} Desc={totalUser} icon={IoMdPeople}></FeatureBox>
            <FeatureBox title={'Average Rating'} Desc={averageRating.toFixed(2)} icon={IoStarOutline}></FeatureBox>
            <FeatureBox title={'Fast Delivery (Min)'} Desc={30} icon={CiDeliveryTruck}></FeatureBox>
        </div>
    );
};

export default FeatureHome;