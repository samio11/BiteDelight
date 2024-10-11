import React from 'react';
import { Helmet } from 'react-helmet';
import SliderHome from './SliderHome';
import FeatureHome from './FeatureHome';

const Home = () => {
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
        </div>
    );
};

export default Home;