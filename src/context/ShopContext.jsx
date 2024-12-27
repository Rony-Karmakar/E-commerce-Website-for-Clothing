import { createContext, useEffect, useState } from "react"
//import { products } from "../assets/assets"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const [cartItemCount, setCartItemCount] = useState(0)
    const [cartIds, setCartIds] = useState([]);
    const [rerender, setRerender] = useState(0);
    const currency = '₹';
    const delivery_fee = 10;

    const fetchCartData = async () => {
        try {
            const res = await axios.get("http://localhost:5454/api/cart/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            })
            if (res) {
                console.log(res.data)
                const ids = res.data.cartItems.map((item) => item.id);
                setCartItemCount(res.data.cartItems.length);
                setCartIds(ids);
                console.log(cartIds);
            }
        } catch (err) {
            console.log("Something went wrong", err)
        }
    }

    const addToCart = async (productId, size, quantity, price) => {

        console.log(productId, size, quantity, price);
        try {
            const res = await axios.post("http://localhost:5454/api/cart/add", { productId, size, quantity, price },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                }
            )
            if (res) {
                console.log(res.data);
                toast.success(res.data.message)
                setRerender(!rerender);
            }
        } catch (err) {
            console.log("Something went wrong")
        }
    }

    const value = {
        rerender, setRerender, currency, delivery_fee,
        cartItemCount, fetchCartData, addToCart, cartIds
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;