import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaFire, FaClock, FaPizzaSlice } from 'react-icons/fa';

const FoodModal = ({ open, foodData, closeModal }) => {
    console.log(foodData)
    return (
        <div>
            <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={closeModal}>
                <div className="fixed inset-0 bg-black bg-opacity-50"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            className="w-full max-w-2xl rounded-xl bg-gradient-to-b from-gray-900 to-black p-6 shadow-2xl backdrop-blur-2xl text-white"
                        >
                            <div className="flex flex-col items-center">
                                {/* Modal Title */}
                                <DialogTitle as="h3" className="text-2xl font-semibold mb-4">
                                    {foodData.food_name}
                                </DialogTitle>

                                {/* Food Image */}
                                <img
                                    src={foodData.food_image}
                                    alt={foodData.food_name}
                                    className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                                />

                                {/* Description */}
                                <p className="text-sm text-gray-400 text-center mb-6">
                                    {foodData.description}
                                </p>

                                {/* Food Details */}
                                <div className="w-full grid grid-cols-2 gap-4 text-gray-300">
                                    <div>
                                        <FaPizzaSlice className="inline-block text-yellow-500 mr-2" />
                                        <strong>Category:</strong> {foodData.category}
                                    </div>
                                    <div>
                                        <FaFire className="inline-block text-red-500 mr-2" />
                                        <strong>Spiciness:</strong> {foodData.spiciness_level}/5
                                    </div>
                                    <div>
                                        <FaClock className="inline-block text-blue-400 mr-2" />
                                        <strong>Cooking Time:</strong> {foodData.cooking_time} mins
                                    </div>
                                    <div>
                                        <strong>Calories:</strong> {foodData.calories} kcal
                                    </div>
                                    <div>
                                        <strong>Quantity:</strong> {foodData.food_quantity} available
                                    </div>
                                    <div>
                                        <strong>Origin:</strong> {foodData.dish_from}
                                    </div>
                                    {foodData.chef_special && (
                                        <div className="col-span-2">
                                            <span className="bg-yellow-500 text-black px-2 py-1 rounded">
                                                Chef's Special!
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Price and Rating */}
                                <div className="flex justify-between w-full mt-6">
                                    <span className="text-2xl font-bold">${foodData.price}</span>
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-md">
                                        ⭐ {foodData.rating} / 5
                                    </span>
                                </div>

                                {/* Close Button */}
                                <div className="mt-8">
                                    <button
                                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-2 px-6 text-sm font-semibold text-white shadow-lg hover:bg-gray-600 focus:outline-none"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default FoodModal;