import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaSearch, FaBox, FaUsers, FaInfoCircle, FaUser } from "react-icons/fa";

const Header = ({ username, onLogout }) => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = () => navigate("/login");
  const handleRegisterClick = () => navigate("/register");
  const handleProductsClick = () => navigate("/");
  const handleUsersClick = () => navigate("/users");
  const handleAboutClick = () => navigate("/about");
  const handleHomeClick = () => navigate("/");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <div className="w-full py-4 px-6 lg:px-20 bg-white flex items-center justify-between mb-8 shadow-lg border-b border-gray-200">
        {/* Logo/Home */}
        <div className="flex items-center justify-start">
          <button
            onClick={handleHomeClick}
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            ShopApp
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

          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="w-4 h-4 text-gray-400" />
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-all duration-200"
                placeholder="Search products..."
              />

              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 text-purple-700 bg-white hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:via-purple-600 hover:to-purple-700 border border-purple-700 focus:ring-2 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 transition-all duration-200"
              >
                Search
              </button>
            </div>
          </form>
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
        
        <button
          onClick={handleSearch}
          className="flex flex-col items-center text-gray-600 hover:text-purple-600 transition-colors"
        >
          <FaSearch className="w-5 h-5" />
          <span className="text-xs mt-1">Search</span>
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

// Placeholder za FavoriteItem komponentu
const FavoriteItem = ({ user, setShowFavorites }) => {
  return (
    <div className="w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Your Favorites</h3>
        <button 
          onClick={() => setShowFavorites(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      <div className="text-center py-8 text-gray-500">
        <FaHeart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p>No favorite items yet</p>
      </div>
    </div>
  );
};

export default Header;