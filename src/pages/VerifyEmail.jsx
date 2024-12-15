import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); // Extract the token from the URL
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                // Call the verify API with the token
                const response = await axios.get(`http://localhost:5454/auth/verify?token=${token}`);
                console.log(response);
                setMessage(response.data.message); // Extract success message from API response
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.error || 'Verification failed. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            verifyEmail();
        } else {
            setError('Invalid or missing token.');
            setLoading(false);
        }
    }, [token]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
                {loading ? (
                    <p className="text-lg font-semibold">Verifying your email...</p>
                ) : error ? (
                    <div>
                        <p className="text-red-600 text-lg font-semibold">{error}</p>
                        <Link to="/register" className="w-full mt-4 inline-block bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900">
                            Go back to Signup
                        </Link>
                    </div>
                ) : (
                    <div>
                        <p className="text-green-600 text-lg font-semibold">{message}</p>
                        <Link to="/Log" className="w-full mt-4 inline-block bg-gray-800 text-white py-2 rounded-lg 
                        hover:bg-gray-900">
                            Go to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
