import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "boxicons"; // Import Boxicons
import leaves from "../../../assets/images/leaves.jpg"; // Import the background image

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Reset error

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
      if (res.data.success) {
        console.log(res);
        navigate("/dashboard"); // Redirect to dashboard after login
      }
    } catch (err) {
      setError(err.response.data.message || "Login failed"); // Display error message
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${leaves})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-25 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center">
          <box-icon name="user" size="lg" color="white"></box-icon> {/* Adjusted icon size */}
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="flex items-center border-b border-gray-300">
            <box-icon name="envelope" className="input-icon" color="white"></box-icon>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-2 text-white bg-transparent rounded focus:bg-opacity-50 outline-none focus:font-semibold transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border-b border-gray-300">
            <box-icon name="lock-alt" className="input-icon" color="white"></box-icon>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-2 text-white bg-transparent rounded focus:bg-opacity-50 outline-none focus:font-semibold transition-all"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`w-full p-2 font-semibold text-white rounded ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Links for Sign Up and Forgot Password */}
        <p className="flex justify-between">
          <a href="/signup" className="text-white hover:text-blue-500">
            Don't have an account?
          </a>
          <a href="/forgot-password" className="text-white hover:text-blue-500">
            Forgot password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;