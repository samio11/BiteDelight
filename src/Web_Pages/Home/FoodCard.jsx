import React, { useState } from 'react';
import Rating from 'react-rating';
import { FaStar, FaRegStar, FaFire, FaClock, FaPizzaSlice } from 'react-icons/fa';
import FoodModal from './FoodModal';

const FoodCard = ({ food }) => {
    const [open, setOpen] = useState(false);
    const handleShow = () => {
        setOpen(true);  // Set the modal open to true
    };

    const handleClose = () => {
        setOpen(false);  // Set the modal open to false (this is passed to close the modal)
    };
    return (
        <div className="w-full mx-auto bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
        <img className="p-3 w-full h-[250px] object-cover rounded-t-lg" src={food.food_image} alt={food.food_name} />
        <div className="px-5 pb-5">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">{food.food_name}</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{food.description}</p>
            <div className="flex items-center mb-4">
                <Rating
                    placeholderRating={food.rating}
                    emptySymbol={<FaRegStar className="text-gray-400" />}
                    fullSymbol={<FaStar className="text-yellow-500" />}
                    placeholderSymbol={<FaStar className="text-yellow-500" />}
                />
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">{food.rating}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                    <FaPizzaSlice className="mr-1" />
                    <span>{food.category}</span>
                </div>
                <div className="flex items-center">
                    <FaFire className="mr-1" />
                    <span>Spicy: {food.spiciness_level}</span>
                </div>
            </div>
            <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 mt-2">
                <div className="flex items-center">
                    <FaClock className="mr-1" />
                    <span>{food.cooking_time} mins</span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">${food.price}</span>
            </div>
            <button onClick={handleShow} className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-200">
                View for Add Cart
            </button>
        </div>
        <FoodModal open={open} foodData={food} closeModal={handleClose} />
    </div>
    );
};

export default FoodCard;