import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotalValue from '../components/CartTotalValue';

const Cart = () => {

    const { products, currency, cartItems, updateQuantity, navigate} = useContext(ShopContext);

    const [cartData, setCartData] = useState([]);
    
    useEffect(()=> {

        const tempData = [];
        for(const items in cartItems){
            for(const item in cartItems[items]){
                if(cartItems[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item]
                    })
                }
            }
        }
        setCartData(tempData)
    },[cartItems])

    return (
        <div className='border-t pt-14 px-8'>
            {/* details of cartItems */}
            <div>
                {
                    cartData.map((item, index) => {
                        const productData = products.find((product)=> product._id === item._id);
                        return (
                            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-cols-3 justify-around items-center gap-4'>
                                <div className='flex items-start gap-6'>
                                    <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                                    <div>
                                        <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                        <div className='flex items-center gap-5 mt-2'>
                                            <p>{currency}{productData.price}</p>
                                            <p className='px-2 border bg-slate-50'>{item.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <input onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity}/>
                                <button onClick={()=> updateQuantity(item._id, item.size, 0)}><RiDeleteBin6Line /></button>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotalValue/>
                    <div className='w-full text-end'>
                        <button onClick={()=> navigate('/Place-Order')} className='bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-700'>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart