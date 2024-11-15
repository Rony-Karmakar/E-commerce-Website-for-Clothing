import { useState, useEffect } from "react";
import axios from "axios";
import { IoStar } from "react-icons/io5";

const TotalOrderComponent = ({ orderData, status}) => {
    const [review, setReview] = useState('');
    const [productId, setProductId]= useState(0);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (orderData && orderData.product) {
            setProductId(orderData.product.id);
        }
    }, [orderData]);

    const sendReview = async () => {
        
        console.log(productId, review, rating);
        try{
            const [res, res1] = await Promise.all([ 
            axios.post("http://localhost:5454/api/reviews/create", 
                {productId, review},{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                }),
            axios.post("http://localhost:5454/api/ratings/create", 
                {productId, rating},{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                }),
            ])
            console.log(res.data);
            console.log(res1.data)
        }catch(error){
            console.log("Something went wrong", error);
        }
    }

    return (
        <div>
            {orderData && (
                <div 
                className="py-6 border-b text-gray-700 flex flex-col bg-white px-4" 
                style={{ maxWidth: '90%', minHeight: '150px' }} // Adjust width and height
                >
                {/* Product Image and Details */}
                <div className="flex items-center gap-4">
                    <img className="w-16 sm:w-20" src={orderData.product.imageUrl} alt={orderData.product.title} />

                    <div className="flex flex-col">
                    <p className="text-sm font-semibold">{orderData.product.title}</p>
                    <p className="text-sm text-gray-600">Size: {orderData.size}</p>
                    </div>
                </div>

                {/* Rating Section */}
                <div className="flex justify-between mt-2">
                    <div className="mb-4">
                    <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                        <IoStar
                            key={star}
                            className={`cursor-pointer text-xl ${
                            rating >= star ? "text-gray-500" : "text-gray-300"
                            }`}
                            onClick={() => setRating(star)}
                        />
                        ))}
                    </div>
                    </div>

                    <div className="flex">
                    <div>
                        Order Status:&nbsp;
                    </div>
                    <div className="text-red-500">
                        {status}
                    </div>
                    </div>
                </div>

                {/* Review Submission Section */}
                <div className="mt-4">
                    <p className="text-sm font-semibold mb-2">Submit a Review:</p>
                    <textarea 
                    className="w-full border border-gray-300 rounded-md p-2 text-sm" 
                    rows="3" 
                    placeholder="Write your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                    <button 
                    className="mt-2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600" 
                    onClick={() => {
                        setProductId(orderData.product.id)
                        sendReview()
                    }}
                    >
                    Submit Review
                    </button>
                </div>
            </div>
            )}
        </div>
    );
};

export default TotalOrderComponent;
