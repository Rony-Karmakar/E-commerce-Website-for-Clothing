import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import OrderDetails from '../components/OrderDetails';
import { useLocation, useNavigate } from 'react-router-dom';

const Orders = () => {
    const location = useLocation();
    const orderDetails = location.state;
    const navigate = useNavigate();
    const { currency } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);
    const [subtotal, setSubtotal] = useState(0)
    const [render, setRender] = useState(1);
    const [id, setId] = useState(null);
    const [linkk, setLink] = useState("")
    console.log(orderDetails);
    useEffect(() => {
        const fetchOrdersData = async () => {
            setOrderData(orderDetails.orderItems)
            setId(orderDetails.id);
        }
        fetchOrdersData()
    }, [])

    return (
        <div className='border-t pt-14 px-20 bg-gray-50'>
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className='pb-8'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orderData.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    className="w-full h-full object-cover"
                                    src={item.product.imageUrl}
                                    alt={item.product.title}
                                />
                            </div>
                            <div className="p-4 flex-grow">
                                <h3 className="text-lg font-semibold mb-2">{item.product.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">Brand: {item.product.brand}</p>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-bold">{currency}{item.product.discountedPrice}</span>
                                    <span className="text-sm text-gray-500 line-through">{currency}{item.product.price}</span>
                                </div>
                                <p className="text-sm text-green-600 mb-2">({item.product.discountPercent}% OFF)</p>
                                <div className="flex justify-between items-center text-sm">
                                    <span>Size: {item.size}</span>
                                    <span>Quantity: {item.quantity}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <OrderDetails orderData={orderDetails} />
        </div>
    )
}

export default Orders

