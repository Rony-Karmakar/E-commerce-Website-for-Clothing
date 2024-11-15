import axios from 'axios';
import React from 'react';
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishListProductCard = ({ id, image, name, price, discountedPrice, discountPercent, render, setRender }) => {

    const onRemove = async (id) => {
        try{
            const res = await axios.delete(`http://localhost:5454/api/wishlist/remove/${id}`,{
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` 
                }
            })
            if(res){
                setTimeout(() => toast.success(res.data.message), 0);
            }
            setRender(!render);
        }catch(err){
            console.log("Something went wrong", err)
        }
    }

    return (
        <div className="text-gray-700 cursor-pointer block">
        {/* Container for Image and Add to Cart button */}
        <div className="relative group w-36 sm:w-40 md:w-48 lg:w-56">
            {/* Product image */}
            <div className="overflow-hidden h-48 sm:h-52 md:h-64 lg:h-72 flex items-center justify-center relative">
            <img
                className="hover:scale-110 transition ease-in-out w-full h-full object-cover"
                src={image}
                alt={name}
            />

            {/* Remove from wishlist button */}
                <button
                    className="absolute top-2 right-2 bg-gray-200 w-6 h-6 rounded-full text-gray-600 hover:bg-gray-300 flex items-center justify-center text-lg leading-none"
                    onClick={() => onRemove(id)}
                >
                    <IoMdClose />
                </button>




            {/* Add to Cart button (Initially hidden, appears on hover) */}
            <button
                onClick={() => addToCart(id, price)}
                className="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-sm active:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                ADD TO CART
            </button>
            </div>
        </div>

        {/* Product name */}
        <div className="text-sm w-40 font-semibold mb-2">{name}</div>

        {/* Product price and discount */}
        <div className="flex items-center gap-2 mt-2">
            <p>${discountedPrice}</p>
            <p className="text-gray-500 line-through">${price}</p>
            <p className="text-green-500">({discountPercent}% OFF)</p>
        </div>
        </div>
    );
    };

    export default WishListProductCard;
