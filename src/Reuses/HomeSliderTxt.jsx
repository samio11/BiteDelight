import React from 'react';

const HomeSliderTxt = ({title,desc}) => {
    return (
        <div className='space-y-3 text-center'>
            <h2 className='text-xl md:text-3xl italic font-semibold'>{title}</h2>
            <p className='text-sm md:text-sm'>{desc}</p>
        </div>
    );
};

export default HomeSliderTxt;