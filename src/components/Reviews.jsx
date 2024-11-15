import React from 'react';

const Reviews = ({ review, rating }) => {
    const combinedReviews = review.map((item) => {
        const ratingInfo = rating.find((rate) => rate.user.id === item.user.id);
        return {
            ...item,
            rating: ratingInfo ? ratingInfo.rating : null,
        };
    });

    return (
        combinedReviews.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-md p-4 shadow-sm mb-4">
                <div className="flex items-center">
                    <div className="bg-green-500 text-white text-sm font-bold px-2 py-1 flex items-center justify-center rounded-lg">
                        {item.rating} ★
                    </div>
                </div>

                <p className="mt-2 text-gray-700 text-sm">{item.review}</p>

                <div className="flex justify-between items-center mt-4">
                    <div className="text-gray-500 text-xs">
                        <span>{item.user.firstName}</span> | <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        ))
    );
};

export default Reviews;
