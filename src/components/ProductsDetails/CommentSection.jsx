import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEllipsisH,
  FaStar,
  FaPaperPlane,
  FaCalendarAlt,
} from "react-icons/fa";

const CommentSection = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  const fetchComments = async () => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/ratings/product/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setError("Error while fetching comments");
        return;
      }

      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!productId) return;
    fetchComments();
  }, [productId]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    // Handle comment submission
    console.log({ comment: newComment, rating });
    setNewComment("");
    setRating(0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
          <FaUserCircle className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
          Comments & Reviews
        </h2>
      </div>

      {/* Comments List */}
      <div className="space-y-4 mb-6">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 rounded-xl p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {comment.user?.username?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {comment.user?.username || "Unknown user"}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm">
                      <FaCalendarAlt className="w-3 h-3 mr-1" />
                      <span>{comment.date || "No date"}</span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <FaEllipsisH className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-700 italic">"{comment.comment}"</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FaUserCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>

      {/* Comment Form */}
      <form
        onSubmit={handleSubmitComment}
        className="bg-gray-50 rounded-xl p-4 border border-gray-200"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none"
              >
                <FaStar
                  className={`w-6 h-6 ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
              placeholder="Share your thoughts about this product..."
            />
          </div>
          <button
            type="submit"
            className="self-end bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FaPaperPlane className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
