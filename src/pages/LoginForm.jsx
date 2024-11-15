import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkLogin = () => {
      if (localStorage.getItem("jwtToken")) {
        navigate('/');
      } else {
        navigate('/Log');
      }
    };
    checkLogin();
  }, [navigate]);

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {};

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
      const res = await axios.post('http://localhost:5454/auth/signin', { email, password });
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        localStorage.setItem("jwtToken", res.data.jwt);
        toast.success("Log In Successfully");
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        
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
          Submit
        </button>
        
        <div className="text-center mt-4">
          Not a user?
          <Link to="/Register" className="text-sky-400 ml-1"> Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
