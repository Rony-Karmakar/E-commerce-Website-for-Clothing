import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { FaHeart, FaStar } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ id, image, brand, name, price, discountPercent, discountedPrice, sizes, quantity }) => {
    const [size, setSize] = useState("S");
    const [wishlist, setWishlist] = useState(false);
    const [rating, setRating] = useState(0.0);

    useEffect(() => {
        const getRating = async () => {
            try {
                const res = await axios.get(`http://localhost:5454/api/ratings/product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                });
                setRating(res.data.averageRating);
            } catch (err) {
                console.error("Error fetching rating:", err);
            }
        };

        getRating();
    }, [id]);

    const addToWishlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const res = await axios.post("http://localhost:5454/api/wishlist/add", { productId: id, size }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            setWishlist(!wishlist);
            if (res.data) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error("Failed to add to wishlist");
        }
    };

    const isOutOfStock = quantity === 99;

    return (
        <div className={`group relative flex flex-col h-full ${isOutOfStock ? 'opacity-75' : ''}`}>
            <Link to={`/Product/${id}`} className="flex-grow">
                <div className="relative w-full pb-[100%] overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                    <img
                        className={`absolute top-0 left-0 w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110 ${isOutOfStock ? 'filter grayscale' : ''}`}
                        src={image}
                        alt={name}
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg?height=300&width=300';
                            console.error('Error loading image:', image);
                        }}
                    />
                    {!isOutOfStock && (
                        <button
                            onClick={addToWishlist}
                            className={`absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg ${wishlist ? 'text-red-500' : 'text-gray-400'} transition-all duration-300 opacity-0 group-hover:opacity-100 z-10`}
                            aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            <FaHeart size={18} />
                        </button>
                    )}
                    {isOutOfStock ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-red-600 text-white px-4 py-2 rounded-md font-bold text-lg transform rotate-45 shadow-lg">
                                Out of Stock
                            </div>
                        </div>
                    ) : (
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className='flex justify-center items-center gap-2'>
                                {sizes.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setSize(item.name);
                                        }}
                                        className={`
                                            text-xs font-semibold py-1 px-2 rounded-full transition-all duration-200
                                            ${item.name === size
                                                ? 'bg-white text-black shadow-lg transform scale-110'
                                                : 'bg-black bg-opacity-50 text-white hover:bg-white hover:text-black'
                                            }
                                        `}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Link>
            <div className="mt-4 space-y-2 flex-shrink-0">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{brand}</h3>
                    <div className="flex items-center bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
                        <FaStar className="mr-1" />
                        {rating.toFixed(1)}
                    </div>
                </div>
                <p className="text-sm text-gray-500 truncate">{name}</p>
                <div className="flex items-center space-x-2">
                    <p className="text-lg font-semibold text-gray-900">₹{discountedPrice}</p>
                    <p className="text-sm text-gray-500 line-through">₹{price}</p>
                    <p className="text-sm font-medium text-green-500">({discountPercent}% OFF)</p>
                </div>
                {isOutOfStock && (
                    <p className="text-red-600 font-semibold">Out of Stock</p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;

