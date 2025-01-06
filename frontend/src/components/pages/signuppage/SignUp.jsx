import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "boxicons"; // Import Boxicons
import leaves from "../../../assets/images/leaves.jpg"; // Import the background image

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Reset error

    // Debugging: Log input data
    console.log("Signup data:", { fullName, username, email, password, confirmPassword });

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false); // End loading
      return;
    }

    try {
      console.log("Sending request to backend...");

      const res = await axios.post("http://localhost:5000/api/users/signup", {
        fullName,
        username,
        email,
        password,
      });

      // Debugging: Log the response
      console.log("Response from backend:", res);

      if (res.data.success) {
        navigate("/dashboard"); // Redirect to dashboard after signup
      } else {
        setError(res.data.message); // Display error message from backend
      }
    } catch (err) {
      // Debugging: Log the error
      console.error("Error during signup:", err);

      if (err.response) {
        setError(err.response.data.message); // Display server error message
      } else {
        setError("An unexpected error occurred");
      }
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
          <box-icon name="user" size="lg" color="white"></box-icon>
        </h2>
        <form onSubmit={handleSignup} className="space-y-6">
          {/* Full Name Input */}
          <div className="flex items-center border-b border-gray-300">
            <box-icon name="user" className="input-icon" color="white"></box-icon>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              required
              className="w-full p-2 text-white bg-transparent rounded focus:bg-opacity-50 outline-none focus:font-semibold transition-all"
            />
          </div>

          {/* Username Input */}
          <div className="flex items-center border-b border-gray-300">
            <box-icon name="user-circle" className="input-icon" color="white"></box-icon>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full p-2 text-white bg-transparent rounded focus:bg-opacity-50 outline-none focus:font-semibold transition-all"
            />
          </div>

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

          {/* Confirm Password Input */}
          <div className="flex items-center border-b border-gray-300">
            <box-icon name="lock-open" className="input-icon" color="white"></box-icon>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full p-2 text-white bg-transparent rounded focus:bg-opacity-50 outline-none focus:font-semibold transition-all"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className={`w-full p-2 font-semibold text-white rounded ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Links for Login */}
        <p className="flex justify-center">
          <a href="/login" className="text-white hover:text-blue-500">
            Already have an account?
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
