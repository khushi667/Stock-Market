// src/dashboard/pages/Logout.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      const isConfirmed = window.confirm("Are you sure you want to log out?");
      if (isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Navigate with state to show logout message
        navigate('/', { state: { logoutMessage: 'You have logged out successfully.' } });
      } else {
        navigate(-1);
      }
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default Logout;
