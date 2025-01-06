import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setMessage(""); // Reset success message

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`/api/users/reset-password/${token}`, { password });
      if (res.data.success) {
        setMessage("Password has been reset successfully!");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Input */}
          <div className="flex items-center border-b border-gray-300">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              required
              className="w-full p-2 text-black bg-transparent rounded focus:bg-opacity-50 outline-none transition-all"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="flex items-center border-b border-gray-300">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full p-2 text-black bg-transparent rounded focus:bg-opacity-50 outline-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded"
          >
            Reset Password
          </button>
        </form>

        {/* Messages */}
        {message && <p className="text-green-500 text-center mt-4">{message}</p>}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
