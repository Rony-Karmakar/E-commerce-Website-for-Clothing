import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotalValue from '../components/CartTotalValue';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import InputField from '../components/InputField';

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { navigate } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="flex flex-col sm:flex-row justify-around gap-8 py-8 min-h-[80vh] border-t bg-gray-50">
            {/* Responsive card for Delivery Information */}
            <div className="flex flex-col gap-4 w-full sm:w-2/3 md:w-1/2 lg:w-[40%] xl:w-[35%] bg-white p-4 sm:p-6 shadow-md rounded-md transition-width duration-300 ease-in-out">
                <div className="text-xl sm:text-2xl mb-4">
                    <Title text1="DELIVERY" text2="INFORMATION" />
                </div>

                <div className="flex gap-4">
                    <InputField
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        name="firstName"
                    />
                    <InputField
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        name="lastName"
                    />
                </div>

                <InputField
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E-mail Address"
                    name="email"
                />
                <InputField
                    label="Street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="Street"
                    name="street"
                />

                <div className="flex gap-4">
                    <InputField
                        label="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        name="city"
                    />
                    <InputField
                        label="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        name="state"
                    />
                </div>

                <div className="flex gap-4">
                    <InputField
                        label="Zip Code"
                        type="number"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="Zip Code"
                        name="zipCode"
                    />
                    <InputField
                        label="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Country"
                        name="country"
                    />
                </div>

                <InputField
                    label="Phone Number"
                    type="number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    name="phone"
                />
            </div>

            {/* Responsive card for Payment Method */}
            <div className="mt-8 w-full sm:w-2/3 md:w-1/2 lg:w-[40%] xl:w-[35%]">
                <div className="bg-white p-4 sm:p-6 shadow-md rounded-md">
                    <CartTotalValue />
                </div>

                <div className="mt-8 bg-white p-4 sm:p-6 shadow-md rounded-md">
                    <Title text1="PAYMENT" text2="METHOD" />

                    <div className="flex flex-col gap-4">
                        <div onClick={() => setMethod('stripe')} className={`flex items-center gap-3 border p-3 cursor-pointer rounded-md ${method === 'stripe' ? 'border-green-400' : 'border-gray-300'}`}>
                            <div className={`w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></div>
                            <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
                        </div>

                        <div onClick={() => setMethod('razorpay')} className={`flex items-center gap-3 border p-3 cursor-pointer rounded-md ${method === 'razorpay' ? 'border-green-400' : 'border-gray-300'}`}>
                            <div className={`w-4 h-4 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></div>
                            <img className="h-5 mx-4" src={assets.razorpay_logo} alt="Razorpay" />
                        </div>

                        <div onClick={() => setMethod('cod')} className={`flex items-center gap-3 border p-3 cursor-pointer rounded-md ${method === 'cod' ? 'border-green-400' : 'border-gray-300'}`}>
                            <div className={`w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></div>
                            <p className="text-gray-600 text-sm font-medium mx-4">Cash on Delivery</p>
                        </div>
                    </div>

                    <div className="w-full text-right mt-8">
                        <button onClick={() => navigate('/orders')} className="bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 transition">
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
