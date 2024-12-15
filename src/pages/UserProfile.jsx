import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // Tabs management
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5454/api/users/profile",
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
          });
        console.log(res.data);
        setUserData(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
        setMobile(res.data.mobile);
        setDob(res.data.dob);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (e) => {
    setIsEditing(!isEditing)
    if (isEditing) {
      try {
        const res = await axios.patch("http://localhost:5454/api/users/update", {
          firstName, lastName, email, mobile, dob
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
        });
        console.log(res);
        setUserData(res.data)
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <div className="container mx-auto p-6 text-center">Loading...</div>;
  }

  if (!userData) {
    return (
      <div className="container mx-auto p-6 text-center text-red-600">
        Failed to load user data.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        {/* Header Section */}
        <div className="flex items-center p-6 border-b border-gray-200">
          <div className="flex-shrink-0">
            <div className="h-20 w-20 rounded-full bg-yellow-400 flex items-center justify-center text-white text-3xl font-semibold">
              {userData.firstName[0]}
              {userData.lastName[0]}
            </div>
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold">
              {userData.firstName} {userData.lastName}
            </h1>
            <p className="text-gray-500">{userData.email}</p>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 p-4">
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === "profile"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
                }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === "orders"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
                }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === "wishlist"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
                }`}
              onClick={() => setActiveTab("wishlist")}
            >
              Wishlist
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === "addresses"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
                }`}
              onClick={() => setActiveTab("addresses")}
            >
              Addresses
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    defaultValue={userData.firstName}
                    readOnly={!isEditing}
                    className={`mt-2 w-full p-3 border ${isEditing ? "border-gray-500" : "border-gray-300"
                      } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${isEditing ? "bg-white" : "bg-gray-100"
                      }`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    defaultValue={userData.lastName}
                    readOnly={!isEditing}
                    className={`mt-2 w-full p-3 border ${isEditing ? "border-gray-500" : "border-gray-300"
                      } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${isEditing ? "bg-white" : "bg-gray-100"
                      }`}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  onChange={(e) => { setEmail(e.target.value) }}
                  defaultValue={userData.email}
                  readOnly={!isEditing}
                  className={`mt-2 w-full p-3 border ${isEditing ? "border-gray-500" : "border-gray-300"
                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${isEditing ? "bg-white" : "bg-gray-100"
                    }`}
                />
              </div>
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile
                </label>
                <input
                  id="mobile"
                  type="text"
                  onChange={(e) => setMobile(e.target.value)}
                  defaultValue={userData.mobile || "Not Provided"}
                  readOnly={!isEditing}
                  className={`mt-2 w-full p-3 border ${isEditing ? "border-gray-500" : "border-gray-300"
                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${isEditing ? "bg-white" : "bg-gray-100"
                    }`}
                />
              </div>
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <input
                  id="dob"
                  type="text"
                  onChange={(e) => setDob(e.target.value)}
                  defaultValue={userData.dob || "Not Provided"}
                  readOnly={!isEditing}
                  className={`mt-2 w-full p-3 border ${isEditing ? "border-gray-500" : "border-gray-300"
                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 ${isEditing ? "bg-white" : "bg-gray-100"
                    }`}
                />
              </div>
              <div>
                <label
                  htmlFor="createdAt"
                  className="block text-sm font-medium text-gray-700"
                >
                  Member Since
                </label>
                <input
                  id="createdAt"
                  type="text"
                  defaultValue={formatDate(userData.createdAt)}
                  readOnly
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                />
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-lg font-semibold">Total Orders</h2>
              <p className="text-2xl">{userData.totalOrders}</p>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              <h2 className="text-lg font-semibold">Wishlist Items</h2>
              <p className="text-2xl">{userData.totalWishlists}</p>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <h2 className="text-lg font-semibold">Saved Addresses</h2>
              <p className="text-2xl">{userData.totalAddresses}</p>
            </div>
          )}
        </div>

        <div className="text-right mb-4 pr-4"> <Link to="/reset-password" className="text-blue-600 hover:underline"> Reset Password </Link> </div>

        <div className="p-6 border-t">
          <button
            onClick={updateProfile}
            className="bg-gray-700 p-3 rounded-lg text-slate-100"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
