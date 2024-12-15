import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import Reviews from '../components/Reviews';
import SimilarProducts from '../components/SimilarProducts';

const API = "http://localhost:5454/api/products/search";

const ProductDetails = () => {
    const { id } = useParams();
    const { currency, addToCart } = useContext(ShopContext);
    const [singleProduct, setSingleProduct] = useState({});
    const [size, setSize] = useState("S");
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [similarProducts, setSimilarProducts] = useState([]);

    const compareTitles = (title1, title2) => {
        const words1 = title1.toLowerCase().split(/\s+/);
        const words2 = title2.toLowerCase().split(/\s+/);
        const commonWords = words1.filter(word => words2.includes(word));
        return commonWords.length >= 8;
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const [productRes, ratingRes] = await Promise.all([
                    axios.get(`http://localhost:5454/api/products/id/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                        }
                    }),
                    axios.get(`http://localhost:5454/api/ratings/product/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                        }
                    })
                ]);

                if (productRes.data && ratingRes.data) {
                    setSingleProduct(productRes.data);
                    setRating(ratingRes.data.averageRating);
                    fetchSimilarProducts(productRes.data.category.name, productRes.data.title);
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to load product details");
            }
        };

        fetchProductDetails();
    }, [id]);

    const fetchSimilarProducts = async (category, title) => {
        try {
            const res = await axios.get(`${API}?q=${category}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
            });
            if (res.data) {
                const similar = res.data.filter(product =>
                    product.id !== id && compareTitles(product.title, title)
                );
                setSimilarProducts(similar);
            }
        } catch (err) {
            console.error("Error fetching similar products:", err);
        }
    };

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (value !== '' && value !== '0') {
            setQuantity(parseInt(value));
        }
    };

    if (!singleProduct.id) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    {/* Left column */}
                    <div className="w-full aspect-w-1 aspect-h-1">
                        <img
                            src={singleProduct.imageUrl}
                            alt={singleProduct.title}
                            className="w-full h-full object-center object-cover sm:rounded-lg"
                        />
                    </div>

                    {/* Right column */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{singleProduct.title}</h1>

                        <div className="mt-3 flex items-center">
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((star) => (
                                    <svg
                                        key={star}
                                        className={`h-5 w-5 flex-shrink-0 ${star < Math.round(singleProduct.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        aria-hidden="true"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="ml-2 text-sm text-gray-500">{singleProduct.totalRatings} reviews</p>
                        </div>

                        <div className="mt-6">
                            <h2 className="sr-only">Product information</h2>
                            <div className="flex items-center">
                                <p className="text-3xl text-gray-900">{currency}{singleProduct.discountedPrice}</p>
                                <p className="ml-2 text-lg text-gray-500 line-through">{currency}{singleProduct.price}</p>
                                <p className="ml-2 text-lg text-green-500">({singleProduct.discountPercent}% OFF)</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <div className="text-base text-gray-700 space-y-6">{singleProduct.description}</div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-900">Size</h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {singleProduct.sizes && singleProduct.sizes.map((item) => (
                                    <button
                                        key={item.name}
                                        type="button"
                                        onClick={() => setSize(item.name)}
                                        className={`${item.name === size
                                            ? 'bg-black text-white'
                                            : 'bg-white text-gray-900 border-gray-200'
                                            } border rounded-md py-2 px-4 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors`}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10 flex sm:flex-col1 space-x-4">
                            <div className="w-24">
                                <label htmlFor="quantity" className="sr-only">
                                    Quantity
                                </label>
                                <input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    min={1}
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-base leading-normal text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => addToCart(singleProduct.id, size, quantity, singleProduct.price)}
                                className="flex-1 bg-black border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-transform transform hover:scale-105 active:scale-95"
                            >
                                Add to Cart
                            </button>
                        </div>
                        <div className="mt-6 text-center">
                            <p className="mt-1 text-sm text-gray-500">{singleProduct.quantity} items available</p>
                        </div>
                    </div>
                </div>

                {/* Similar Products Slider */}
                <SimilarProducts similarProducts={similarProducts} currency={currency} />

                {/* Reviews section */}
                <div className="mt-16 lg:mt-24">
                    <Title text1="Ratings" text2="Reviews" />
                    {singleProduct.reviews && singleProduct.reviews.length > 0 ? (
                        <div className="mt-6 border-t border-gray-200 pt-10">
                            <Reviews review={singleProduct.reviews} rating={singleProduct.ratings} />
                        </div>
                    ) : (
                        <p className="mt-4 text-gray-500">No reviews available for this product.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

