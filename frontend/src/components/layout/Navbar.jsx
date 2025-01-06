import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLoginClick, onSignupClick }) => {
  return (
    <nav className="text-black py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-8">
          <div className="text-lg font-bold">
            <Link to="/">StockVista</Link>
          </div>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={onLoginClick}
            className="hover:text-gray-600 transition duration-200 text-black-800 text-md"
          >
            <Link to="/login">Login</Link>
          </button>
          <button
            onClick={onSignupClick}
            className="hover:text-gray-600 transition duration-200 text-black-800 text-md pl-4"
          >
            <Link to="/signup">Sign Up</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
