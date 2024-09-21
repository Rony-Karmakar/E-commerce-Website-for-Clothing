import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa"; // You need to install react-icons

const AddReview = ({ productId }) => {
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/products/${productId}/reviews`, {
        user,
        rating,
        comment,
      });
      setSuccess(true);
      setUser("");
      setRating(0);
      setComment("");
    } catch (err) {
      setError("Error submitting the review");
    }
  };

  return (
    <div className="max-w mx-auto p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Add a Review</h3>

      {/* Success and Error Messages */}
      {success && <p className="text-green-500 mb-4">Review added successfully!</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Review Form */}
      <form onSubmit={handleSubmit}>
        {/* User Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name:
          </label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your name"
          />
        </div>

        {/* Rating Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating:
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl ${
                  rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        {/* Comment Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comment:
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your comment"
            rows="4"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-40 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-200"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
