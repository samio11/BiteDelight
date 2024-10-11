import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import HomeSliderTxt from '../../Reuses/HomeSliderTxt';

const SliderHome = () => {
    return (
        <div className='w-full h-[80vh] my-3'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full h-full"
            >
                <SwiperSlide className='w-full h-full'>
                    <div className='flex justify-center items-center'>
                        {/* left side  */}
                        <div className='flex-1'>
                            <HomeSliderTxt title={'Delicious Meals, Made Just for You'} desc={"At BiteDelight, we pride ourselves on offering a diverse menu filled with mouth-watering dishes crafted with passion and precision. From classic favorites to modern culinary delights, our meals are made from the freshest ingredients, ensuring every bite is packed with flavor. Whether you're joining us for a cozy dine-in experience or ordering online, our commitment to quality and taste remains unparalleled. Come and enjoy a culinary journey like no other."}></HomeSliderTxt>
                        </div>
                        {/* Right Side  */}
                        <div className='flex-1'>
                            <img src="./s1.png" alt="" />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className='flex justify-center items-center'>
                        {/* left side  */}
                        <div className='flex-1'>
                            <HomeSliderTxt title={'Experience Culinary Excellence'} desc={"Our talented chefs bring years of expertise and a deep love for food to every plate. The Chef’s Specials are a celebration of innovation, combining seasonal ingredients with bold, creative flavors. Every dish is a masterpiece, designed to tantalize your taste buds and offer a unique dining experience. From expertly grilled meats to fresh seafood and exquisite desserts, you’ll find something that excites your palate and leaves you craving more. Indulge in the best of what our kitchen has to offer."}></HomeSliderTxt>
                        </div>
                        {/* Right Side  */}
                        <div className='flex-1'>
                            <img src="./s2.png" alt="" />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className='flex justify-center items-center'>
                        {/* left side  */}
                        <div className='flex-1'>
                            <HomeSliderTxt title={'Order Online, Fast & Easy'} desc={"Hungry for your favorite dish but short on time? With our easy-to-use online ordering system, getting your favorite meal has never been more convenient. Simply browse our menu, choose your dishes, and place your order in just a few clicks. Whether you prefer delivery or pickup, we ensure that your food is freshly prepared and arrives just the way you like it. Satisfy your cravings with the click of a button and enjoy the deliciousness of [Restaurant Name] from the comfort of your home."}></HomeSliderTxt>
                        </div>
                        {/* Right Side  */}
                        <div className='flex-1'>
                            <img src="./s3.png" alt="" />
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default SliderHome;