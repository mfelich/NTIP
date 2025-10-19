import React from "react";
import logo from "../assets/react.svg";
import { useNavigate } from "react-router-dom";

const UserPreviewCard = ({ userId, firstName, lastName, email }) => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/user-profile/${userId}`);
  }

  return (
    <div className="w-[200px] py-4 bg-white border border-gray-200 rounded-lg shadow-sm ">
      <div className="flex flex-col items-center">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={logo}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 e">
          {firstName} {lastName}
        </h5>
        <span className="text-sm text-gray-500 mb-4">{email}</span>
        <div className="flex">
          <button
            className="secondary-button"
            onClick={handleButtonClick}
          >
            View profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPreviewCard;
