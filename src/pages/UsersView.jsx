import React, { useState } from "react";
import Header from "../components/Header";
import SidebarFilter from "../components/ProductsView/SidebarFilter";
import UserPreviewCard from "../components/UserPreviewCard";
import { useEffect } from "react";

const UsersView = () => {

  const [users, setUsers] = useState([]); 

  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setError('');
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/user/all", {
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
      setUsers(data.content); 
    } catch (err) {
      setError(err.message);
    } finally {
    }
  };

    useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>

      {/* Page */}
      <div className="w-full flex items-start justify-between px-28 space-x-14">
        {/* Filter section (left side) */}
        <div className="w-3/12 flex items-start justify-end">
          <SidebarFilter></SidebarFilter>
        </div>

        {/* User list section (right side) */}
        <div className="w-9/12  flex items-start justify-end space-y-4">
          <div className="w-full">
            <form className="relative">
              <div className="relative w-[320px] mb-2">
                {/* Search icon */}
                <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
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
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>

                {/* Input */}
                <input
                  type="text"
                  id="default-search"
                  className="block w-[320px] p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Search..."
                />

                {/* Button */}
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-md text-sm px-3"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="w-full flex flex-wrap justify-start gap-x-8 gap-y-3 mb-4">
              {/* User card list */}
              {users.length > 0 ? (
              users.map((user) => (
          <UserPreviewCard
            key={user.id}
            userId={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
          />
        ))
      ) : (
        <p>Nema korisnika za prikaz.</p>
      )}
            </div>

            {/* Page navigation */}
            <div className="w-full flex items-center justify-center">
              <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm shadow-md">
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
                    >
                      Previous
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      aria-current="page"
                      className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 "
                    >
                      3
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                    >
                      4
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                    >
                      5
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersView;
