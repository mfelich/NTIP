import React, { useEffect, useState } from "react";
import ProductSmallCard from "./ProductSmallCard";

const UserOtherListings = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();

  const fetchUserProducts = async () => {
    setError("");
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/api/products/user/${userId}`,
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
      setProducts(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
    }
  };

  useEffect(() => {
    if(userId){
      fetchUserProducts();
    }
  }, [userId]);

  return (
    <>
      <div className="bg-white w-full px-6 py-4 mb-6 rounded-lg shadow-md">
        <h1 className="component-title mb-4">Other user products</h1>

        <div className="flex items-center justify-start space-x-4 overflow-x-scroll">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductSmallCard key={product.id} product={product} />
            ))
          ) : (
            <h1>This user has no products.</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default UserOtherListings;
