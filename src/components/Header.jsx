import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaBox, FaUsers, FaInfoCircle, FaUser } from "react-icons/fa";
import FavoriteItem from "./FavoriteItem";

const Header = ({ username, onLogout }) => {
  const [showFavorites, setShowFavorites] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => navigate("/login");
  const handleRegisterClick = () => navigate("/register");
  const handleProductsClick = () => navigate("/");
  const handleUsersClick = () => navigate("/user-view");
  const handleAboutClick = () => navigate("/about");
  const handleHomeClick = () => navigate("/");

  return (
    <>
      <div className="w-full py-4 px-6 lg:px-20 bg-white flex items-center justify-between shadow-lg border-b border-gray-200">
        {/* Logo/Home */}
        <div className="flex items-center justify-start">
          <button
            onClick={handleHomeClick}
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Biddora
          </button>
        </div>

        {/* Navigation and Search */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl mx-8">
          <nav className="flex items-center space-x-8 mr-8">
            <button
              onClick={handleProductsClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 group"
            >
              <FaBox className="text-sm group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Products</span>
            </button>
            
            <button
              onClick={handleUsersClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 group"
            >
              <FaUsers className="text-sm group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Users</span>
            </button>
            
            <button
              onClick={handleAboutClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 group"
            >
              <FaInfoCircle className="text-sm group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">About Us</span>
            </button>
          </nav>

        
        </div>

        {/* User Actions */}
        {username ? (
          <div className="flex items-center justify-end space-x-4">
            {/* Favorites */}
            <div className="relative">
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 relative group"
              >
                <FaHeart className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </div>
              </button>

              {/* Favorites Popup */}
              {showFavorites && (
                <div className="absolute right-0 mt-2 z-50">
                  <FavoriteItem 
                    user={username}
                    setShowFavorites={setShowFavorites}
                  />
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-gray-700">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <FaUser className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium hidden sm:block">{username}</span>
              </div>
              
              <button
                onClick={onLogout}
                className="text-sm text-gray-500 hover:text-red-500 font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={handleRegisterClick}
              className="text-sm text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 hidden sm:block"
            >
              Create Account
            </button>
            
            <button
              onClick={handleLoginClick}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 flex justify-around items-center shadow-lg z-40">
        <button
          onClick={handleHomeClick}
          className="flex flex-col items-center text-gray-600 hover:text-purple-600 transition-colors"
        >
          <FaBox className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button
          onClick={handleProductsClick}
          className="flex flex-col items-center text-gray-600 hover:text-purple-600 transition-colors"
        >
          <FaBox className="w-5 h-5" />
          <span className="text-xs mt-1">Products</span>
        </button>
        

        
        {username ? (
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="flex flex-col items-center text-gray-600 hover:text-purple-600 transition-colors"
          >
            <FaHeart className="w-5 h-5" />
            <span className="text-xs mt-1">Favorites</span>
          </button>
        ) : (
          <button
            onClick={handleLoginClick}
            className="flex flex-col items-center text-gray-600 hover:text-purple-600 transition-colors"
          >
            <FaUser className="w-5 h-5" />
            <span className="text-xs mt-1">Login</span>
          </button>
        )}
      </div>
    </>
  );
};


export default Header;