import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const Wishlists = () => {
    
    const {products, wishlist} = useContext(ShopContext)
    console.log(wishlist);
    return (
        <div className="p-4">
          {/* Wishlist Page */}
          <h2 className="text-xl font-bold mt-8 mb-4">Wishlist</h2>
          {wishlist.length > 0 ? (
            <div className='py-5 px-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6'>
              {
                wishlist.map((item, index)=> (
                  <ProductCard key={index} id={item._id} image={item.image[0]} name={item.name} price={item.price}/>
              ))

              }  
            </div>
          ) : (
            <p>No items in the wishlist.</p>
          )}
        </div>
    )
}

export default Wishlists