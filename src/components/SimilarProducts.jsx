import React, { useRef } from 'react';
import Title from './Title';
import { FaStar } from "react-icons/fa";

const SimilarProductsSlider = ({ similarProducts, currency }) => {
    const sliderRef = useRef(null);
    console.log(similarProducts);
    const scrollSlider = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = direction === 'left' ? -280 : 280;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (similarProducts.length === 0) {
        return (
            <div className="mt-16 lg:mt-24">
                <Title text1="Similar" text2="Products" />
                <p className="mt-4 text-gray-500 text-center">No similar products available.</p>
            </div>
        );
    }

    return (
        <div className="mt-16 lg:mt-24">
            <Title text1="Similar" text2="Products" />
            <div className="mt-6 relative">
                <button
                    onClick={() => scrollSlider('left')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
                    aria-label="Scroll left"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div
                    ref={sliderRef}
                    className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {similarProducts.map((product) => (
                        <div
                            key={product.id}
                            className="flex-none w-64 scroll-snap-align-start"
                        >
                            <div className="group relative">
                                <div className="overflow-hidden w-36 h-48 sm:w-40 sm:h-52 md:w-48 md:h-64 lg:w-56 lg:h-72 flex items-center justify-center relative">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.title}
                                        className="hover:scale-110 transition ease-in-out w-full h-full object-cover"
                                    />
                                </div>
                                <div className="mt-4">
                                    <div>
                                        <h3 className="text-sm text-gray-700 pb-2">
                                            <a href={`/product/${product.id}`}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.title}
                                            </a>
                                        </h3>
                                    </div>
                                    <div className='flex'>
                                        <div className="flex items-center bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
                                            <FaStar className="mr-1" />
                                            {product.averageRating.toFixed(1)}
                                        </div>
                                        <div className="text-sm pl-2 font-medium text-gray-900">{currency}{product.price}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => scrollSlider('right')}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
                    aria-label="Scroll right"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SimilarProductsSlider;

