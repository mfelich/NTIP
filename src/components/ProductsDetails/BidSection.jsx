import React, { useState } from "react";
import { FaGavel, FaHistory, FaUser, FaDollarSign, FaPaperPlane, FaTrophy, FaCalendarAlt } from "react-icons/fa";

const BidSection = () => {
  const [bidAmount, setBidAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bids = [
    { id: 1, amount: 550, date: "24.10.2025", user: "mfelich", isWinning: true },
    { id: 2, amount: 490, date: "24.10.2025", user: "unaMaki", isWinning: false },
    { id: 3, amount: 430, date: "24.10.2025", user: "takiTaki", isWinning: false },
  ];

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    if (!bidAmount) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Placing bid:", bidAmount);
      setBidAmount("");
      // Add success toast here
    } catch (error) {
      console.error("Error placing bid:", error);
      // Add error toast here
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Bids Table Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <FaGavel className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Bidding History</h2>
              <p className="text-white/80 text-sm">{bids.length} active bids</p>
            </div>
          </div>
        </div>

        {/* Bids List */}
        <div className="p-6">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 rounded-lg mb-3 border border-gray-200">
            <div className="col-span-4 flex items-center space-x-3">
              <FaDollarSign className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">Bid</span>
            </div>
            <div className="col-span-4 flex items-center space-x-3">
              <FaCalendarAlt className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">Date</span>
            </div>
            <div className="col-span-3 flex items-center space-x-3">
              <FaUser className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">User</span>
            </div>
          </div>

          <div className="space-y-3">
            {bids.map((bid, index) => (
              <div
                key={bid.id}
                className={`grid grid-cols-12 gap-4 items-center p-4 rounded-xl border transition-all duration-200 ${
                  bid.isWinning
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                } ${index === 0 ? 'ring-2 ring-green-200' : ''}`}
              >
                {/* Bid Amount Column */}
                <div className="col-span-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      bid.isWinning
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-300'
                    }`}>
                      <FaDollarSign className={`w-5 h-5 ${bid.isWinning ? 'text-white' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-lg font-bold ${bid.isWinning ? 'text-green-700' : 'text-gray-700'}`}>
                        {formatCurrency(bid.amount)}
                      </span>
                      {bid.isWinning && (
                        <span className="flex items-center text-green-600 text-xs font-medium mt-1">

                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date Column */}
                <div className="col-span-4">
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span className="text-sm font-medium">{bid.date}</span>
                  </div>
                </div>

                {/* User Column */}
                <div className="col-span-3">
                  <div className="flex items-center text-gray-600">
                    <FaUser className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span className="text-sm font-medium">{bid.user}</span>
                  </div>
                </div>


              </div>
            ))}
          </div>

          {/* No Bids State */}
          {bids.length === 0 && (
            <div className="text-center py-8">
              <FaGavel className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No bids yet. Be the first to bid!</p>
            </div>
          )}
        </div>
      </div>

      {/* Place Bid Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <form onSubmit={handlePlaceBid} className="space-y-4">
          <div className="flex items-center space-x-4">
            {/* Bid Input */}
            <div className="flex-1 relative">
              <FaDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                placeholder="Enter your bid amount"
                min={bids[0]?.amount + 1 || 1}
                required
              />
            </div>

            {/* Place Bid Button */}
            <button
              type="submit"
              disabled={isSubmitting || !bidAmount}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:shadow-none disabled:cursor-not-allowed min-w-32 justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Placing...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane className="w-4 h-4" />
                  <span>Place Bid</span>
                </>
              )}
            </button>
          </div>

          {/* Bid Information */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FaTrophy className="w-3 h-3 text-green-500 mr-1" />
                <span>Current bid: <strong>{formatCurrency(bids[0]?.amount || 0)}</strong></span>
              </div>
              <div className="flex items-center">
                <FaGavel className="w-3 h-3 text-purple-500 mr-1" />
                <span>Minimum bid: <strong>{formatCurrency((bids[0]?.amount || 0) + 1)}</strong></span>
              </div>
            </div>
            
            <div className="flex items-center text-gray-500">
              <FaHistory className="w-3 h-3 mr-1" />
              <span>{bids.length} bids</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BidSection;