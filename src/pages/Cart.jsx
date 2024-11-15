import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotalValue from '../components/CartTotalValue';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    //const API = ;
    //const { products, currency, cartItems, updateQuantity, navigate} = useContext(ShopContext);
    const navigate = useNavigate();
    const {currency, setRerender, rerender} = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const [totalCartData, setTotalCartData] = useState([]);
    const [subtotal, setSubtotal] = useState(0)
    const [render, setRender] = useState(1);

    useEffect(()=> {
        const fetchCartData = async () => {
            try{
                const res = await axios.get("http://localhost:5454/api/cart/", {
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}` 
                      }
                })
                if(res){
                    console.log(res.data)
                    setTotalCartData(res.data);
                    setCartData(res.data.cartItems);
                    setSubtotal(res.data.totalDiscountedPrice)
                }
                console.log(cartData);
                console.log(subtotal);
                console.log(res.data.cartItems.length)
            }catch(err){
                console.log("Something went wrong",err)
            }
        }
        fetchCartData()
    }, [render])

    const deleteCartItem = async (id) => {
        try{
            const res = await axios.delete(`http://localhost:5454/api/cart_items/${id}`,{
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` 
                  }
            })
            if(res){
                console.log(res);
                setTimeout(() => toast.success(res.data.message), 0);
                setRender(!render);
                setRerender(!rerender);
            }

        }catch(err){
            console.log("Something went wrong",err)
        }
    }

    const updateCartItem = async (id, cart, product, size, quantity, price, userId) => {
        console.log(quantity);
        try {
            const res = await axios.put(`http://localhost:5454/api/cart_items/${id}`, {
                cart, product, size, quantity, price, userId 
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` 
                }
            });
            if(res){
                console.log(res)
                setRender(!render);
            }
        }catch(err){
            console.log("Something went wrong",err)
        }
    }

    return (
        <div className='border-t pt-14 px-8 bg-gray-50'>
            {/* details of cartItems */}
            <div>
                {
                    cartData.map((item, index) => {
                        //const productData = products.find((product)=> product._id === item._id);
                        return (
                            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-cols-3 justify-around items-center gap-4'>
                                <div className='flex items-start gap-6'>
                                    <img className='w-16 sm:w-20' src={item.product.imageUrl} alt="" />
                                    <div>
                                        <p className='text-xs sm:text-lg font-medium'>{item.product.title}</p>
                                        <div className='flex items-center gap-5 mt-2'>
                                           <p>
                                                {currency}{item.product.discountedPrice}
                                            </p>
                                            <p className=' text-gray-500 line-through'>
                                                {currency}{item.product.price}
                                            </p>
                                            <p className=' text-green-500'>
                                                ({item.product.discountPersent}% OFF)
                                            </p>
                                            <p className='px-2 border bg-slate-50'>{item.size}</p>
                                            <input 
                                                
                                                className='border-2 border-gray-400 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 mr-2' 
                                                type="number" 
                                                min={1} 
                                                defaultValue={item.quantity}
                                                onChange={(e) => updateCartItem(item.id, item, item.product, item.size, e.target.value, item.product.price, totalCartData.user.id)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button onClick={()=> deleteCartItem(item.id)}><RiDeleteBin6Line /></button>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <div className="bg-white p-4 sm:p-6 shadow-md rounded-md">
                        <CartTotalValue subtotal={subtotal}/>
                    </div>
                    <div className='w-full text-end'>
                        <button onClick={()=> navigate('/Details')} className='bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-700'>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart