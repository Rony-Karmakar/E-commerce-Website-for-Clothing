import React, { useState } from 'react';
import axios from 'axios'
import InputField from '../components/InputField';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try{
      const res = await axios.post('/', {email, firstName, lastName, password})
      alert("Registered Successfully")
      console.log(res);
    }catch(error) {
        console.log(error);
        console.log("Something went wrong")
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        
        <InputField
          label="Email-id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email id"
        />

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
          Register
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
