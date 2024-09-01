import React, { useState, axios } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField';

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit= async () => {
    try{
      const res = await axios.post('/', {email, password})
      alert("Log In Successfully")
      console.log(res);
    }catch(error) {
        console.log(error);
        console.log("Something went wrong")
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
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-200"
        >
          Submit
        </button>
        <div className='text-center'>
          Not a user?
          <Link to="/Register" className='text-sky-400'> Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
