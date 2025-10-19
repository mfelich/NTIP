import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaClock, FaTag, FaArrowRight, FaShoppingBag, FaLock, FaLockOpen, FaCalendar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import foto from "../../assets/biciklo.jpeg"

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    navigate(`/product-details/${product.id}`);
  };

  const handleAddToFavorite = async (e) => {
    e.stopPropagation(); // Prevent navigation when clicking favorite
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to favorites");
      }

      setIsFavorite(true);
      // You might want to show a success toast here
    } catch (error) {
      console.error("Error adding to favorites:", error);
      // You might want to show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusConfig = (status) => {
    const statusUpper = status?.toUpperCase();
    
    switch (statusUpper) {
      case 'OPEN':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <FaLockOpen className="w-3 h-3 mr-1" />,
          label: 'OPEN'
        };
      case 'CLOSED':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <FaLock className="w-3 h-3 mr-1" />,
          label: 'CLOSED'
        };
      case 'SCHEDULED':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <FaCalendar className="w-3 h-3 mr-1" />,
          label: 'SCHEDULED'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <FaTag className="w-3 h-3 mr-1" />,
          label: statusUpper || 'UNKNOWN'
        };
    }
  };

  const statusConfig = getStatusConfig(product?.productStatus);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group h-80"> {/* Increased height */}
      <div className="flex h-full"> {/* Full height flex container */}
        {/* Product Image - Full height */}
        <div className="relative w-80 h-full flex-shrink-0"> {/* Increased width */}
          <img 
            src={foto} 
            alt={product?.name || "Product image"} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Favorite Button */}
          <button
            onClick={handleAddToFavorite}
            disabled={isLoading}
            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isFavorite 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 shadow-md'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : isFavorite ? (
              <FaHeart className="w-4 h-4" />
            ) : (
              <FaRegHeart className="w-4 h-4" />
            )}
          </button>

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}>
              {statusConfig.icon}
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Product Content */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Main content with flex-1 to push button down */}
          <div className="flex-1">
            {/* Product Name and Description */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                {product?.name || "Product Name"}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4"> {/* Reduced line-clamp */}
                There are many variations of passages of Lorem Ipsum available, but
                the majority have suffered alteration in some form, by injected humour.
              </p>
            </div>

            {/* Product Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Starting Price */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-3"> {/* Reduced padding */}
                <div className="flex items-center text-gray-600 text-xs mb-1"> {/* Smaller text */}
                  <FaShoppingBag className="w-3 h-3 mr-1" />
                  Starting Price
                </div>
                <div className="text-xl font-bold text-gray-900"> {/* Smaller text */}
                  ${formatPrice(product?.startingPrice || 0)}
                </div>
              </div>

              {/* Time Info */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-3"> {/* Reduced padding */}
                <div className="flex items-center text-gray-600 text-xs mb-1"> {/* Smaller text */}
                  <FaClock className="w-3 h-3 mr-1" />
                  {product?.productStatus?.toUpperCase() === 'SCHEDULED' ? 'Starts In' : 
                   product?.productStatus?.toUpperCase() === 'OPEN' ? 'Ends In' : 'Closed'}
                </div>
                <div className="text-lg font-semibold text-gray-900"> {/* Smaller text */}
                  {formatDate(product?.startTime)}
                </div>
              </div>
            </div>
          </div>

          {/* Action Section - Now properly positioned at bottom */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4"> {/* Added margin top */}
            <div className="flex items-center space-x-3 text-xs text-gray-500"> {/* Smaller text and spacing */}
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                <span>Verified</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                <span>Secure</span>
              </div>
            </div>

            <button
              onClick={handleClick}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 group/btn text-sm" /* Smaller button */
            >
              <span>View Product</span>
              <FaArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;