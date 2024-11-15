import { createContext, useEffect, useState } from "react"
//import { products } from "../assets/assets"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const ShopContext = createContext();

// const API = import.meta.env.VITE_NAME;

const ShopContextProvider = (props) => {
    
    const [cartItemCount, setCartItemCount] = useState([0])
    const [rerender, setRerender] = useState(0);
    const currency = '$';
    const delivery_fee = 10;

    const fetchCartData = async () => {
        try{
            const res = await axios.get("http://localhost:5454/api/cart/", {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}` 
                  }
            })
            if(res){
                console.log(res.data)
                setCartItemCount(res.data.cartItems.length);
            }
        }catch(err){
            console.log("Something went wrong",err)
        }
    }

    const value = {
        rerender, setRerender, currency, delivery_fee,
        cartItemCount, fetchCartData
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;