import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); // Extract token from URL
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // Use the API_BASE_URL from .env
    const API_BASE_URL = "http://localhost:5454/auth/reset-password";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, { token, newPassword: password });
            console.log(response);
            setSuccess(true);
        } catch (err) {
            console.log(err.response);
            const errorMessage = err.response?.data?.error || "An error occurred. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-6 md:p-8 rounded shadow-md w-full max-w-lg">
                <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">Reset Password</h1>
                {success ? (
                    <div className="text-center">
                        <p className="text-green-600 text-sm md:text-base">
                            Your password has been successfully reset!
                        </p>
                        <a
                            href="/Log"
                            className="w-full mt-4 inline-block bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 text-sm md:text-base"
                        >
                            Go to Login
                        </a>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 md:text-base"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm md:text-base"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 md:text-base"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm md:text-base"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-red-600 text-sm md:text-base mb-4">{error}</p>}
                        <button
                            type="submit"
                                className={`w-full py-2 px-4 text-white font-medium rounded-lg text-sm md:text-base ${loading ? "bg-gray-600" : "bg-gray-800 hover:bg-gray-900"
                                }`}
                            disabled={loading}
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;