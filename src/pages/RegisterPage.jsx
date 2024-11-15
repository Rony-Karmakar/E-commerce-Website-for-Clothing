import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../components/InputField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {};

    // First Name validation
    if (!firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    // Last Name validation
    if (!lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } 

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const res = await axios.post('http://localhost:5454/auth/signup', 
        { firstName, lastName, email, password }, 
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error response: ", error.response?.data?.error); 
      toast.error(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <InputField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          error={errors.firstName}  // Pass error message if first name is invalid
        />

        <InputField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          error={errors.lastName}  // Pass error message if last name is invalid
        />
        
        <InputField
          label="Email-id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email id"
          error={errors.email}  // Pass error message if email is invalid
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          error={errors.password}  // Pass error message if password is invalid
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-200"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
