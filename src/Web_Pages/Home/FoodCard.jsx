import React from 'react';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';

const FoodCard = ({ food }) => {
    console.log(food)
    return (
        <div>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="p-3 w-full h-[250px] rounded-t-lg" src={food.food_image} alt="product image" />
                </a>
                <div className="px-5 pb-5">
                    <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{food.food_name}</h5>
                    </a>
                    <div className="flex items-center mt-2.5 mb-5">
                        <Rating
                            placeholderRating={food.rating}
                            emptySymbol={<FaRegStar className="icon" style={{ color: 'grey' }} />}  // Grey empty star
                            placeholderSymbol={<FaStar className="icon" style={{ color: 'yellow' }} />}  // Red placeholder star
                            fullSymbol={<FaStar className="icon" style={{ color: 'red' }} />}  // Yellow full star
                        />

                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{food.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${food.price}</span>
                        <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;