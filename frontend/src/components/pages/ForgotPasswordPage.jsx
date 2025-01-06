import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setMessage(""); // Reset success message

    try {
      const response = await axios.post('/api/users/forgot-password', { email });

      if (res.data.success) {
        setMessage("Check your email for the password reset link.");
      }
    } catch (err) {
      setError(err.response.data.message || "An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-25 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="flex items-center border-b border-gray-300">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-2 text-black bg-transparent rounded focus:bg-opacity-50 outline-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded"
          >
            Send Reset Link
          </button>
        </form>

        {/* Messages */}
        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
