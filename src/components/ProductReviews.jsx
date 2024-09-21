import React from 'react';

const Review = ({ username, review }) => {
  return (
    <div className="p-4 border rounded shadow-md mb-4">
      <h3 className="text-lg font-bold">{username}</h3>
      <p>{review}</p>
    </div>
  );
};

const ProductReviews = ({ productName, reviews }) => {
  return (
    <div className="max-w-md mx-auto my-8 p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">{productName}</h2>
      {reviews.length ? (
        reviews.map((review, index) => (
          <Review key={index} username={review.username} review={review.review} />
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ProductReviews;