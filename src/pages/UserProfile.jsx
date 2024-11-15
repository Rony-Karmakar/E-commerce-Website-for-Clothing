import React, { useEffect, useState } from 'react';
import InputField from '../components/InputField';
import { AiOutlineEdit } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState(''); 
    const [address, setAddress] = useState('');
    const [edit, setEdit] = useState(false);

    const handleLogOut = () => {
        localStorage.removeItem("jwtToken")
        navigate("/Log")
    }
    useEffect(() => {
        const fetchProfile = async() => {
            try{
                const res = await axios.get("http://localhost:5454/api/users/profile",{
                    headers:{Authorization: `Bearer ${localStorage.getItem("jwtToken")}`}
                })
                console.log(res);
                console.log(res.data.firstName)
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setEmail(res.data.email);
            }catch(err){
                console.log("wrong", err)
            }
        }

        fetchProfile();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, like saving profile data
        console.log('User Profile:', { firstName, lastName, email, dob, address });
    };

    return (
        <div className="flex justify-around items-center min-h-screen bg-gray-100 px-[15%] sm:px-[0%]">
            <div className="w-64 bg-white p-6 shadow-lg rounded-lg">
            {/* Profile Header */}
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-400 text-white flex items-center justify-center rounded-full text-xl font-bold">
                U
                </div>
                <div className="ml-4">
                <h2 className="text-lg font-semibold">User Name</h2>
                </div>
            </div>

            {/* Menu Buttons */}
            <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-3 text-left bg-gray-100 hover:bg-gray-200 rounded">
                <span className="flex items-center">
                    <i className="fas fa-user mr-2"></i>My Profile
                </span>
                </button>

                <button className="w-full flex items-center justify-between p-3 text-left bg-gray-100 hover:bg-gray-200 rounded">
                <span className="flex items-center">
                    <i className="fas fa-box mr-2"></i> My Orders
                </span>
                <span className="text-sm bg-gray-200 px-2 py-1 rounded">0</span>
                </button>

                <button className="w-full flex items-center justify-between p-3 text-left bg-gray-100 hover:bg-gray-200 rounded">
                <span className="flex items-center">
                    <i className="fas fa-heart mr-2"></i> My Wishlist
                </span>
                <span className="text-sm bg-gray-200 px-2 py-1 rounded">2</span>
                </button>

                <button className="w-full flex items-center justify-between p-3 text-left bg-gray-100 hover:bg-gray-200 rounded">
                <span className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2"></i> Delivery Address
                </span>
                <span className="text-sm bg-gray-200 px-2 py-1 rounded">0</span>
                </button>

                <button className="w-full flex items-center p-3 text-left bg-gray-100 hover:bg-gray-200 rounded">
                <i className="fas fa-lock mr-2"></i> Change Password
                </button>

                <button className="w-full flex items-center p-3 text-left bg-gray-100 hover:bg-gray-200 rounded"
                onClick={handleLogOut}>
                <i className="fas fa-sign-out-alt mr-2"></i> Log Out
                </button>
            </div>
            </div>
            {edit ? <div className="w-full max-w-2xl bg-white p-6 shadow-lg rounded-lg ml-8">
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">User Profile</h2>
                    <button onClick={()=>{setEdit(false)}} className='text-2xl'>
                        <IoMdClose />
                    </button>                    
                </div>
                <form onSubmit={handleSubmit}>                    
                    <div className='flex gap-4'>
                        <InputField
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        />

                        <InputField
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        />
                    </div>
                    
                    <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    />

                    <InputField
                    label="Address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    />

                    <InputField
                    label="Date of Birth"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="Select your date of birth"
                    />

                    <button
                    type="submit"
                    className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-200"
                    >
                    Save Profile
                    </button>
                </form>
            </div> : <div className="w-full max-w-2xl bg-white p-6 shadow-lg rounded-lg ml-8">
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">User Profile</h2>
                    <button onClick={()=>{setEdit(true)}} className='text-2xl'>
                        <AiOutlineEdit />
                    </button>                    
                </div>
                <form onSubmit={handleSubmit}>                    
                    <div className='flex gap-4'>
                        <InputField
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        />

                        <InputField
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        />
                    </div>
                    
                    <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    />

                    <InputField
                    label="Address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    />

                    <InputField
                    label="Date of Birth"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="Select your date of birth"
                    />
                </form>
            </div>
            }
        </div>
    );
    };

    export default UserProfile;
