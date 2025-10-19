import React from "react";
import foto from "../../assets/biciklo.jpeg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserSmallCard = ({userId, username, email}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user-profile/${userId}`);
  };

  return (
    <>
      <div className="w-full bg-white px-6 py-4  rounded-lg shadow-md ">
        <h1 className="component-title text-start mb-4">User</h1>

        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="rounded-lg">
              <img src={foto} alt="" className="w-[80px] rounded-lg" />
            </div>

            <div>
              <h1 className="text-base text-start font-semibold">{username}</h1>
              <h1 className="text-description text-start">
                {email}
              </h1>
            </div>
          </div>

          <div>
            <button className="sec" onClick={handleClick}>View profile</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSmallCard;
