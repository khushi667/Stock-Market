import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null); // Fetch user data dynamically
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  // Fetch user details from API on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/profileuser/session-profile', {
          withCredentials: true,  // This ensures cookies are sent with the request
        });
        
        setUser(response.data);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          username: response.data.username || "",
          password: "",
          confirmPassword: "",
        });
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUser();
  }, []);

  const handleEdit = () => {
    setEditMode(!editMode);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/profileuser/profile",
        {
          name: formData.name,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        },
        { withCredentials: true }
      );

      setUser(response.data); // Update local user data
      setEditMode(false); // Exit edit mode
      setFormData({ ...formData, password: "", confirmPassword: "" }); // Reset sensitive fields
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleRemove = async () => {
    try {
      await axios.delete("http://localhost:5000/api/profileuser/delete", {
        withCredentials: true,
      });
      alert("Account removed successfully");
      // Redirect or update UI after deletion
    } catch (err) {
      console.error("Failed to delete account:", err);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      {/* Profile Header */}
      <div className="profile-header flex flex-col items-center py-10 bg-gray-700 text-white shadow-md">
        <div className="relative mb-4">
          <img
            src={
              user.avatar ||
              `https://api.dicebear.com/6.x/avataaars/svg?seed=anime-${Math.random()}`
            }
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        <h2 className="text-3xl font-bold">{user.name || "Your Name"}</h2>
        <p className="text-xl">{user.email || "your-email@example.com"}</p>
      </div>

      {/* Edit Mode Section */}
      {editMode ? (
        <div className="profile-edit-form bg-gray-800 text-white py-8 px-6 max-w-2xl mx-auto shadow-lg rounded-lg mt-8">
          <h3 className="text-2xl font-bold mb-4">Edit Profile</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full p-4 rounded bg-gray-900 border border-gray-700 focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full p-4 rounded bg-gray-900 border border-gray-700 focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 w-full p-4 rounded bg-gray-900 border border-gray-700 focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full p-4 rounded bg-gray-900 border border-gray-700 focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 w-full p-4 rounded bg-gray-900 border border-gray-700 focus:ring focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 px-6 py-3 rounded hover:bg-blue-600 transition"
            >
              Update
            </button>
            <button
              onClick={handleEdit}
              className="bg-gray-400 px-6 py-3 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // Profile Actions Section
        <div className="flex profile-actions justify-center gap-10 py-8 mt-8">
          <button
            onClick={handleEdit}
            className="w-1/4 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
          >
            Edit Profile
          </button>
          <button
            onClick={handleRemove}
            className="w-1/4 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
          >
            Remove Account
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
