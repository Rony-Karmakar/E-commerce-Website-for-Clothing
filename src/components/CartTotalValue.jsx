import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartTotalValue = ({subtotal}) => {

    const {currency, getCartAmount} = useContext(ShopContext);

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm px-4'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency} {subtotal}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency}{10}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency} {subtotal + 10}</b>
                </div>
            </div>
        </div>
    ) 
}

export default CartTotalValue