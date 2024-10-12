import React from 'react';
import { Helmet } from 'react-helmet';
import SliderHome from './SliderHome';
import FeatureHome from './FeatureHome';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import FoodCard from './FoodCard';

const Home = () => {
    const {data:totalFoods,isLoading} = useQuery({
        queryKey: 'totalFoods',
        queryFn: async () => {
           const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/all-food`)
            return data;
        },
    })
    return (
        <div>
            <Helmet>
                <title>BiteDelight | Home</title>
            </Helmet>
            <div>
                <SliderHome></SliderHome>
            </div>
            <div>
                <FeatureHome></FeatureHome>
            </div>
            <div className='w-full flex justify-center items-center my-5'>
              <div className='text-center space-y-3'>
                 <h2 className='text-3xl italic font-bold'>Our Foods</h2>
                 <p className='text-sm text-grey'>Experience the top delight foods</p>
              </div>
            </div>
            <div className='grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    totalFoods && totalFoods.map((food, index) => (
                        <FoodCard key={index} food={food}></FoodCard>
                    ))
                }
            </div>
        </div>
    );
};

export default Home;