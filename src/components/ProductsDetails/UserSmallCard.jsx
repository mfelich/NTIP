import React from "react";
import { FaUser, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserSmallCard = ({ userId, username, email }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user-profile/${userId}`);
  };

  // Generate consistent gradient background based on user ID
  const getGradient = (id) => {
    const gradients = [
      "from-purple-500 to-blue-500",
      "from-green-500 to-teal-500", 
      "from-orange-500 to-red-500",
      "from-pink-500 to-rose-500",
      "from-indigo-500 to-purple-500"
    ];
    return gradients[id % gradients.length];
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center mb-4">
        <FaUser className="w-4 h-4 text-purple-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">User Profile</h2>
      </div>

      {/* Content */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Avatar with gradient */}
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${getGradient(userId)} flex items-center justify-center shadow-md`}>
            <span className="text-white font-bold text-xl">
              {getInitial(username)}
            </span>
          </div>

          {/* User info */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {username}
            </h3>
            <div className="flex items-center text-gray-600">
              <FaEnvelope className="w-3 h-3 mr-2" />
              <span className="text-sm">{email}</span>
            </div>
          </div>
        </div>

        {/* View profile button */}
        <button
          onClick={handleClick}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <span className="text-sm font-medium">View Profile</span>
          <FaArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default UserSmallCard;