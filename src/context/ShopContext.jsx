import { createContext, useEffect, useReducer, useState } from "react"
import { products } from "../assets/assets"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const ShopContext = createContext();

const API = import.meta.env.VITE_NAME;
console.log(API)

const ShopContextProvider = (props) => {

    const getProducts= async (url) => {
        const res = await axios.get(url);
        const products = await res.data;
    }

    useEffect(()=>{
        getProducts(API);
    }, [])

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate()

    const addToCart = async (itemId, size) => {

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalCount =0;
        for (const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item]
                    }
                }catch(error){

                }
            }
        }
        return totalCount;
    }    

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData)
    }

    const getCartAmount = () => {
        let totalAmout = 0;
        for(const items in cartItems){
            let itemInnfo = products.find((product) => product._id === items);
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmout += itemInnfo.price * cartItems[items][item]
                    } 
                } catch (error){

                }
            }
        }
        return totalAmout
    }

    const handleWishlistToggle = (productId) => {
        const product = products.find((p) => p._id === productId);
        if (wishlist.includes(product)) {
        // Remove product from wishlist
        setWishlist(wishlist.filter((product) => product._id !== productId));
        } else {
        // Add product to wishlist
        setWishlist([...wishlist, product]);
        }
    };

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate, wishlist, setWishlist, handleWishlistToggle
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;