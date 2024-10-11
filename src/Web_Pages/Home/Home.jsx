import React from 'react';
import { Helmet } from 'react-helmet';
import SliderHome from './SliderHome';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>BiteDelight | Home</title>
            </Helmet>
            <div>
                <SliderHome></SliderHome>
            </div>
        </div>
    );
};

export default Home;