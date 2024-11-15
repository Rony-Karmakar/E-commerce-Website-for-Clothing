import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProductCard = ({ id, image, brand, name, price, discountPersent, discountedPrice, sizes}) => {
    const [size, setSize] = useState("S");
    const [wishlist, setWishlist] = useState(false);
    const [rating, setRating] = useState(0.0);

    useEffect (()=> {
        const getRating = async () => {
            try{
                const res = await axios.get(`http://localhost:5454/api/ratings/product/${id}`, {
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}` 
                      }
                })
                setRating(res.data.averageRating);
            }catch(err){
                console.log("Something went wrong", err)
            }
        }

        getRating();
    },[])

    const addToWishlist =async () => {
        setWishlist(!wishlist);
        console.log(id, size);
        try{
            const res = await axios.post("http://localhost:5454/api/wishlist/add", {productId:id, size}, {  
                headers: { 
                  Authorization: `Bearer ${localStorage.getItem("jwtToken")}` 
                }
            })
            if(res){
                toast.success(res.data.message);
            }
            console.log(res.data);
        }catch(error){
            console.log("Error:", error);
        }
    }

    return (
        <div className="relative group ">
            {/* The Link wrapping the entire card */}
            <Link to={`/Product/${id}`} className="text-gray-700 cursor-pointer block ">
                {/* Product Image */}
                <div className="overflow-hidden w-36 h-48 sm:w-40 sm:h-52 md:w-48 md:h-64 lg:w-56 lg:h-72 flex items-center justify-center relative">
                    <img
                        className="hover:scale-110 transition ease-in-out w-full h-full object-cover"
                        src={image}
                        alt={name}
                    />

                    {/* Wishlist Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();  // Prevent the default Link action
                            addToWishlist();// Toggle wishlist state
                        }}
                        className={`absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg ${wishlist ? 'text-red-500' : 'text-gray-300'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}
                    >
                        <FaHeart size={18} />
                    </button>
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className='flex justify-center items-center gap-2 p-4'>
                            {sizes.map((item, index) => (
                            <button
                                onClick={(e) => {
                                e.preventDefault();
                                setSize(item.name);
                                }}
                                className={`
                                text-xs font-semibold
                                py-2 px-3
                                rounded-full
                                transition-all duration-200 ease-in-out
                                ${item.name === size 
                                    ? 'bg-white text-black shadow-lg transform scale-110' 
                                    : 'bg-black bg-opacity-50 text-white hover:bg-white hover:text-black'}
                                `}
                                key={index}
                            >
                                {item.name}
                            </button>
                            ))}
                        </div>
                    </div> 
                </div>

                {/* Product Details */}
                <p className="pt-3 pb-1 text-sm font-bold">{brand}</p>
                <p className="pb-1 text-xs">{name}</p>
                <div className='flex items-center gap-2 mt-2'>
                    <p className="bg-green-500 text-white text-sm font-bold px-2 py-1 flex items-center justify-center rounded-lg">
                        {rating} ★
                    </p>
                    <p>${discountedPrice}</p>
                    <p className='text-gray-500 line-through'>${price}</p>
                    <p className='text-green-500'>({discountPersent}% OFF)</p>
                </div>
                
            </Link>
        </div>
    );
}

export default ProductCard;
