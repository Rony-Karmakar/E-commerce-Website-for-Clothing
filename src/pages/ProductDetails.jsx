import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import Reviews from '../components/Reviews'; // Ensure this is imported
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const { id } = useParams();
    const { currency, rerender, setRerender } = useContext(ShopContext);
    const [singleProduct, setSingleProduct] = useState({});
    const [size, setSize] = useState("S")
    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const getSingleProducts= async (url) => {
            try{
                const [res, res1] = await Promise.all([ 
                axios.get(url,{
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}` 
                      }
                }),
                axios.get(`http://localhost:5454/api/ratings/product/${id}`,{
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}` 
                      }
                }),
            ])
                if(res && res1) {
                    console.log(res);
                    console.log(id);
                    setSingleProduct(res.data); 
                    setRating(res1.data.averageRating);   
                }    
            }catch(err){
                console.log(err);
            }
        }
        getSingleProducts(`http://localhost:5454/api/products/id/${id}`);
    }, []);

    console.log(singleProduct);
    console.log(singleProduct.reviews);

    const addToCart = async (productId,price) => {
        
        console.log(productId,size,quantity,price);
        try{
            const res = await axios.post("http://localhost:5454/api/cart/add", {productId,size,quantity,price},
                {headers: { 
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` 
                  }}
            )
            if(res){
                console.log(res.data);
                toast.success(res.data.message)
                setRerender(!rerender);
            }
        }catch(err){
            console.log("Something went wrong")
        }
    }

    return singleProduct ? (
        <div>
            <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
                {/* Product Data */}
                <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                    {/* Product Images */}
                    <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row px-4'>
                        {/* <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                            <img onClick={() => setimage(singleProduct.imageUrl)} src={singleProduct.imageUrl} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                        </div> */}
                        <div className='w-[50%] lg:w-[30%]'>
                            <img className='w-full h-auto' src={singleProduct.imageUrl} alt="" />
                        </div>

                        {/* Details of product */}
                        <div className='flex-1'>
                            <h1 className='font-medium text-2xl mt-2'>{singleProduct.title}</h1>
                            <div className='flex items-center gap-1 mt-2'>
                                <p className="bg-green-500 text-white text-sm font-bold px-2 py-1 flex items-center justify-center rounded-lg">
                                    {rating} ★
                                </p>
                            </div>

                            {/* Display original and discounted price */}
                            <div className='flex items-center gap-2 mt-5'>
                                <p className='text-3xl font-medium'>
                                    {currency}{singleProduct.discountedPrice}
                                </p>
                                <p className='text-xl text-gray-500 line-through'>
                                    {currency}{singleProduct.price}
                                </p>
                                <p className='text-lg text-green-500'>
                                    ({singleProduct.discountPersent}% OFF)
                                </p>
                            </div>

                            {/* Quantity Available */}
                            <p className='mt-2 text-gray-500'>
                                {singleProduct.quantity} items available
                            </p>

                            <p className='mt-5 text-gray-500 md:w-4/5'>{singleProduct.description}</p>

                            {/* Select Size */}
                            <div className='flex flex-col gap-4 my-8'>
                                <p>Select Size</p>
                                {
                                    singleProduct.sizes && <div className='flex gap-2'>
                                    {singleProduct.sizes.map((item, index) => (
                                        <button
                                            onClick={() => setSize(item.name)}
                                            className={`border py-2 px-4 bg-gray-100 ${item.name === size ? 'border-orange-500' : ''}`}
                                            key={index}
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                </div> 
                                }
                            </div>
                            <div className="flex items-center">
                                <input 
                                    onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : setQuantity(e.target.value)} 
                                    className='border-2 border-gray-400 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 mr-2' 
                                    type="number" 
                                    min={1} 
                                    defaultValue={1}
                                />
                                <button
                                    onClick={() => addToCart(singleProduct.id, singleProduct.price)}
                                    className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
                                >
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Title for Ratings and Reviews */}
            <Title text1="Ratings" text2="Reviews"/>

            {/* Reviews Component */}
            {singleProduct.reviews && singleProduct.reviews.length > 0 ? (
                <div>   
                    <Reviews review={singleProduct.reviews} rating={singleProduct.ratings}/>   
                </div>
            ) : (
                <p className="text-gray-500 mt-5">No reviews available for this product.</p>
            )}
        </div>
    ) : <div className='opacity-0'></div>
}

export default ProductDetails;
