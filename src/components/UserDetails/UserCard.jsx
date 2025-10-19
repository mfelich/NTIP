import React, { useEffect, useState } from "react";
import foto from "../../assets/biciklo.jpeg";
import menuIcon from "../../assets/menuIcon.png";

const UserCard = ({userId}) => {
  const [dropDown, setdropDown] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState();

    const fetchUser = async () => {
      setError('');
      try {
        const token = localStorage.getItem("token");
  
        const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
          method:'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          setError('Error while fethcing users');
          console.log(error);
        }
  
        const data = await response.json();
        setUser(data); 
      } catch (err) {
        setError(err.message);
      } finally {
      }
    };
  
      useEffect(() => {
      fetchUser();
    }, []);

  return (
    <>
      {/* User card */}
      <div className="w-full bg-white px-6 py-4 mb-8  rounded-lg shadow-md">
        <div className="flex items-start justify-between space-x-2">
          <div className="flex items-start justify-center space-x-2">
            {/* User profile picture */}
            <div className="rounded-lg">
              <img src={foto} alt="" className="w-[250px] rounded-lg mr-6" />
            </div>

            {/* User info (username, first name, last name, email, registration date) */}
            <div>
              <h1 className="text-xl text-start font-semibold mb-4">{user ? user.username : ""}</h1>

              <div className="flex items-center space-x-2 justify-start">
                <h1 className="text-description font-semibold text-start">
                  First name:
                </h1>
                <h1 className="text-description">{user ? user.firstName : ""}</h1>
              </div>

              <div className="flex items-center space-x-2 justify-start">
                <h1 className="text-description font-semibold text-start">
                  Last name:
                </h1>
                <h1 className="text-description">{user ? user.lastName : ""}</h1>
              </div>

              <div className="flex items-center space-x-2 justify-start">
                <h1 className="text-description font-semibold text-start">
                  Email:
                </h1>
                <h1 className="text-description">{user ? user.email : ""}</h1>
              </div>

              <div className="flex items-center space-x-2 justify-start">
                <h1 className="text-description font-semibold text-start">
                  Registration date:
                </h1>
                <h1 className="text-description">{user ? user.registrationDate : ""}</h1>
              </div>
            </div>
          </div>

          {/* Edit, report and delete */}
          <div className="mb-2">
            <div className="flex items-center justify-end space-x-2">
              <img
                src={menuIcon}
                alt=""
                className="w-[30px] cursor-pointer"
                onClick={() => setdropDown(!dropDown)}
              />
            </div>

            {/* Dropdown div */}
            {dropDown && (
              <>
                <div className="z-10 bg-white divide-y border mt-2 border-gray-300 divide-gray-100 rounded-lg shadow-sm w-32 ">
                  <ul
                    class="py-2 text-sm text-gray-700 hover:bg-gray-100"
                    aria-labelledby="dropdownDividerButton"
                  >
                    <li>
                      <a href="#" class="block px-4 py-2">
                        <h1 className="text-center">Edit</h1>
                      </a>
                    </li>
                  </ul>
                  <div class="py-2 hover:bg-red-100 ">
                    <a
                      href="#"
                      className="rounded-sm block px-4 py-2 text-sm text-gray-700 "
                    >
                      <h1
                        onClick={() => {
                          setDeletePopUp(true);
                        }}
                        className="text-center"
                      >
                        Delete
                      </h1>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {deletePopUp && (
        <div
          tabIndex="-1"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setDeletePopUp(false)}
          ></div>

          {/* 🔹 Popup forma */}
          <div className="relative z-10 p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm">
              <button
                type="button"
                onClick={() => setDeletePopUp(false)}
                className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                  Are you sure you want to delete this profile?
                </h3>

                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>

                <button
                  onClick={() => setDeletePopUp(false)}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  No, cancel
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
