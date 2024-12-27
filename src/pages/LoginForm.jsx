import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from 'react-icons/fa';

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("jwtToken");

      if (token) {
        try {
          const res = await axios.get('http://localhost:5454/auth/verify', { token });

          if (res.status === 200 && res.data.isValid) {
            navigate('/');
          } else {
            localStorage.removeItem("jwtToken");
            navigate('/Log');
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          localStorage.removeItem("jwtToken");
          navigate('/Log');
        }
      } else {
        navigate('/Log');
      }
    };

    checkLogin();
  }, [navigate]);
  const validateInputs = () => {
    let isValid = true;
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

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

    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
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
          error={errors.email}
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          error={errors.password}
        />

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : null}
          {isLoading ? 'Logging in...' : 'Submit'}
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

