import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotalValue from '../components/CartTotalValue';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import TotalOrderComponent from '../components/TotalOrderComponent';

const TotalOrders = () => {
    //const API = ;
    //const { products, currency, cartItems, updateQuantity, navigate} = useContext(ShopContext);
    const location = useLocation();
    const userDetails = location.state;
    const navigate = useNavigate();
    const { currency } = useContext(ShopContext);
    const [totalOrderData, setTotalOrderData] = useState([]);
    const [totalCartData, setTotalCartData] = useState([]);
    const [subtotal, setSubtotal] = useState(0)
    const [render, setRender] = useState(1);

    useEffect(() => {
        const fetchOrdersData = async () => {
            try {
                console.log(userDetails);
                const res = await axios.get("http://localhost:5454/api/orders/user",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                        }
                    })
                if (res) {
                    console.log(res.data)
                    setTotalOrderData(res.data.reverse());
                }

            } catch (err) {
                console.log("Something went wrong", err)
            }
        }
        fetchOrdersData()
    }, [])

    // const deleteCartItem = async (id) => {
    //     try{
    //         const res = await axios.delete(`http://localhost:5454/api/cart_items/${id}`,{
    //             headers: { 
    //                 Authorization: `Bearer ${localStorage.getItem("jwtToken")}` 
    //               }
    //         })
    //         if(res){
    //             console.log(res);
    //             setRender(!render);
    //         }

    //     }catch(err){
    //         console.log("Something went wrong",err)
    //     }
    // }

    // const updateCartItem = async (id, cart, product, size, quantity, price, userId) => {
    //     console.log(quantity);
    //     try {
    //         const res = await axios.put(`http://localhost:5454/api/cart_items/${id}`, {
    //             cart, product, size, quantity, price, userId 
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("jwtToken")}` 
    //             }
    //         });
    //         if(res){
    //             console.log(res)
    //             setRender(!render);
    //         }
    //     }catch(err){
    //         console.log("Something went wrong",err)
    //     }
    // }

    return (
        <div className='border-t pt-14 px-8 bg-gray-50'>
            {/* details of cartItems */}
            <div>
                {totalOrderData.map((item, id) => (
                    <div key={id}>
                        <p>Created Date: {new Date(item.createdAt).toLocaleDateString()}</p>
                        {item.orderItems.map((orderItem, index) => (
                            <TotalOrderComponent
                                key={index}
                                orderData={orderItem}
                                totalDetails={item}
                                status={item.orderStatus}
                            />
                        ))}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default TotalOrders