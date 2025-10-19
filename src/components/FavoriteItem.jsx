import React, { useEffect, useState } from "react";
import logo from "../assets/react.svg";

const FavoriteItem = ({ setShowFavorites }) => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState();

  const fetchUserFavorites = async () => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      const currentUser = JSON.parse(user);

      const response = await fetch(
        `http://localhost:8080/api/favorites`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setError("Error while fethcing user products");
        console.log(error);
      }

      const data = await response.json();
      setFavorites(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
    }
  };

  useEffect(() => {
      fetchUserFavorites();
  }, []);

  return (
    <div className="w-[320px] bg-white px-4 py-4 rounded-lg space-y-6 shadow-lg ">
      <div className="flex items-center justify-between mb-8">
        <h1 className="component-title">Favorites</h1>
        <button>Exit icon</button>
      </div>

      {favorites && favorites.length > 0 ? (
        favorites.map((fav, index) => (
          <div key={index} className="mb-4 p-4 bg-white rounded shadow">
            <div className="flex items-center justify-between">
              <img src={logo} alt="" className="w-12" />

              <div>
                <h1 className="text-base font-semibold">{fav.product.name}</h1>
                <h2 className="text-description">
                  {fav.user?.username || "Unknown user"}
                </h2>
              </div>

              <div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    // funkcija za uklanjanje iz favorita
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-description ">You have no favorites yet.</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default FavoriteItem;
