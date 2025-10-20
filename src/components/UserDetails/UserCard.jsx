import React, { useEffect, useState } from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaEllipsisV, 
  FaEdit, 
  FaTrash, 
  FaExclamationTriangle,
  FaSpinner,
  FaCheckCircle,
  FaTimes 
} from "react-icons/fa";

const UserCard = ({ userId }) => {
  const [dropDown, setDropDown] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const fetchUser = async () => {
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error while fetching user');
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="w-8 h-8 text-purple-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
        <div className="text-center py-8">
          <FaExclamationTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading User</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchUser}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* User Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* User Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaUser className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{user?.username || "Unknown User"}</h1>
              
              {/* Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => setDropDown(!dropDown)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors duration-200"
                >
                  <FaEllipsisV className="w-4 h-4 text-gray-600" />
                </button>

                {dropDown && (
                  <div className="absolute right-0 top-12 z-10 bg-white border border-gray-200 rounded-xl shadow-lg w-40 overflow-hidden">
                    <button
                      onClick={() => {
                        setDropDown(false);
                        // Add edit functionality here
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <FaEdit className="w-4 h-4 text-blue-500" />
                      <span>Edit Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setDropDown(false);
                        setDeletePopUp(true);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <FaTrash className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* User Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <FaUser className="w-4 h-4 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">First Name</p>
                  <p className="font-semibold text-gray-900">{user?.firstName || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <FaUser className="w-4 h-4 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Last Name</p>
                  <p className="font-semibold text-gray-900">{user?.lastName || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <FaEnvelope className="w-4 h-4 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{user?.email || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <FaCalendarAlt className="w-4 h-4 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Registration Date</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(user?.registrationDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {deletePopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <FaExclamationTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Confirm Deletion</h2>
                  <p className="text-white/80 text-sm">This action cannot be undone</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <FaExclamationTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Delete User Profile?
                </h3>
                <p className="text-gray-600">
                  Are you sure you want to delete <strong>{user?.username}</strong>'s profile? 
                  This will permanently remove all their data and cannot be recovered.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setDeletePopUp(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  disabled={deleting}
                  className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {deleting ? (
                    <>
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <FaTrash className="w-4 h-4" />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;