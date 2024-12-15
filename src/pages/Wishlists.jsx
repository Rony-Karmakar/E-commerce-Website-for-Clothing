import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import WishListProductCard from '../components/wishListProductCard';

const Wishlists = () => {
  const [wishListItems, setWishListItems] = useState([]); // Corrected state variable name
  const [render, setRender] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5454/api/wishlist/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });
        console.log(res);
        setWishListItems(res.data.wishlistItems || []); 
        console.log(res.data.wishlistItems);
      } catch (err) {
        console.error("Something went wrong", err);
        setWishListItems([]); 
      }
    };

    fetchProducts();
  }, [render]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mt-8 mb-4">
        My Wishlist <span className="text-gray-500">({wishListItems.length} items)</span>
      </h2>

      {wishListItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishListItems.map((item, index) => (
            <WishListProductCard
              key={index}
              id={item.id}
              image={item.product.imageUrl}
              name={item.product.title}
              price={item.product.price}
              discountedPrice={item.product.discountedPrice}
              discountPercent={item.product.discountPercent}
              render={render}
              setRender={setRender}
            />
          ))}
        </div>
      ) : (
        <p>No items in the wishlist.</p>
      )}
    </div>
  );
};

export default Wishlists;
