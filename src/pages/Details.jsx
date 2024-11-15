import React, { useState, useEffect } from 'react';
import InputField from '../components/InputField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Details = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [user, setUser] = useState({});
    const [mobile, setMobile] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessages, setErrorMessages] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get("http://localhost:5454/api/users/profile", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` }
                });
                if (res.data) {
                    setUser(res.data);
                    setAddresses(res.data.addresses || []);
                    setFirstName(res.data.firstName || '');
                    setLastName(res.data.lastName || '');
                    setStreetAddress(res.data.streetAddress || '');
                    setCity(res.data.city || '');
                    setState(res.data.state || '');
                    setZipCode(res.data.zipCode || '');
                    setMobile(res.data.mobile || '');
                }
            } catch (err) {
                console.log("Error fetching profile:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const validateForm = () => {
        const errors = {};

        if (!firstName) errors.firstName = "First Name is required";
        if (!lastName) errors.lastName = "Last Name is required";
        if (!streetAddress) errors.streetAddress = "Street Address is required";
        if (!city) errors.city = "City is required";
        if (!state) errors.state = "State is required";
        if (!zipCode) errors.zipCode = "Zip Code is required";
        if (!mobile) errors.mobile = "Mobile Number is required";

        setErrorMessages(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
        setFirstName(address.firstName || '');
        setLastName(address.lastName || '');
        setStreetAddress(address.streetAddress || '');
        setCity(address.city || '');
        setState(address.state || '');
        setZipCode(address.zipCode || '');
        setMobile(address.mobile || '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const userDetails = { firstName, lastName, streetAddress, city, state, zipCode, user, mobile };
        console.log(userDetails);
        navigate('/Orders', { state: userDetails });
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 flex items-center justify-center">
            <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                {/* Address List */}
                <div className="w-full md:w-1/3 bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Saved Addresses</h3>
                    <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                        {addresses.map((address) => (
                            <div 
                                key={address.id} 
                                className={`p-4 border rounded-lg transition-all duration-200 ease-in-out ${
                                    selectedAddress && selectedAddress.id === address.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                }`}
                            >
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedAddress && selectedAddress.id === address.id}
                                        onChange={() => handleAddressSelect(address)}
                                        className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                                    />
                                    <span className="text-gray-700 text-sm">
                                        {address.firstName} {address.lastName}, {address.streetAddress}, {address.city}, {address.state} {address.zipCode}
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Details Form */}
                <div className="w-full md:w-2/3 p-8 md:p-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">User Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            <InputField
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter First Name"
                                error={errorMessages.firstName}
                            />
                            <InputField
                                label="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter Last Name"
                                error={errorMessages.lastName}
                            />
                        </div>

                        <InputField
                            label="Street Address"
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                            placeholder="Enter Street Address"
                            error={errorMessages.streetAddress}
                        />

                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                            <InputField
                                label="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Enter City"
                                error={errorMessages.city}
                            />

                            <InputField
                                label="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="Enter State"
                                error={errorMessages.state}
                            />

                            <InputField
                                label="Zip Code"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                placeholder="Enter Zip Code"
                                error={errorMessages.zipCode}
                            />
                        </div>

                        <InputField
                            label="Mobile Number"
                            type="tel"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Enter Mobile Number"
                            error={errorMessages.mobile}
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Save Details
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Details;
