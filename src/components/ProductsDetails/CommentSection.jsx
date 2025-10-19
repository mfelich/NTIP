import logo from '../../assets/react.svg'
import menuIcon from '../../assets/menuIcon.png'
import { useEffect, useState } from 'react'

const CommentSection = ({productId}) => {

    const [comments, setComments] = useState([]);
    const [error, setError] = useState();
    const[dropDown, setDropDown] = useState(false);

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
            setError("Error while fethcing product");
            console.log(error);
          }
    
          const data = await response.json();
          setComments(data);
          console.log(data);
        } catch (err) {
          setError(err.message);
        } finally {
        }
      };
    
      useEffect(() => {
        if (!productId) return;
        fetchComments();
      }, [productId]);

  return (
    <div className="bg-white px-6 py-4 mb-6 rounded-lg shadow-md">
      <h1 className="component-title mb-4">Comments</h1>

  {comments && comments.length > 0 ? (
    comments.map((comment) => (
      <div key={comment.id} className="comment flex items-start justify-between mb-4">
        <div className="flex items-start">
          <img src={logo} alt="" className="w-[40px] mr-2"/>

          <div className="pr-2">
            <div className="flex items-start justify-start">
              <h1 className="text-start text-sm font-semibold mb-2 mr-4">
                {comment.user?.username || "Unknown user"}
              </h1>
              <h1 className="text-start text-description text-sm mr-24">
                {comment.date || "No date"} {/* ili formatiraj comment.date */}
              </h1>
            </div>

            <p className="text-start text-description"><i>{comment.comment}</i></p>
          </div>
        </div>

        <div>
          <img src={menuIcon} alt="" className="w-[30px] cursor-pointer"/>
        </div>
      </div>
    ))
  ) : (
    <p>No comments yet.</p>
  )}

{/* Comment form */}
<form>
    <label for="chat" class="sr-only">Leave your comment for this article</label>
    <div class="flex items-center px-3 py-2 rounded-lg bg-blue-100">

                {/* Rating stars */}
                <div class="flex items-center">
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
                </div>
        <textarea id="chat" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Leave a comment..."></textarea>
            <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 ">
            <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
            </svg>
            <span class="sr-only">Send message</span>
        </button>
    </div>
</form>
    </div>
  )
}

export default CommentSection
