import React from "react";
import foto from "../../assets/biciklo.jpeg";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product-details/${product.id}`)
  };

  return (
    <>
      {/* Product card */}
      <div className="product-card rounded-lg px-6 py-4 w-[900px] bg-white flex items-center justify-center shadow-md">
        {/* Product card image*/}
        <div className="product-card-image w-[280px] mr-4">
          <img src={foto} alt="" className="rounded-lg" />
        </div>

        {/* Product name*/}
        <div className="product-card-name w-[280px] mr-12">
          <h1 className="component-title text-left">
            {product ? product.name : ""}
          </h1>
          <p className="text-description text-justify">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour.
          </p>
        </div>

        {/* Product price*/}
        <div className="product-card-price w-[180px] mr-8">
          <h1 className="text-base text-gray-900">Starting price</h1>
          <h1 className="text-2xl font-bold text-gray-900">
            {product ? product.startingPrice : ""} $
          </h1>
        </div>

        {/* Product info*/}
        <div className="product-card-info w-[200px] space-y-2">
          <div className="flex items-center justify-start">
            <h1 className="text-sm text-gray-900 mr-2">Bid status:</h1>
            <span className="inactive-span">
              {product ? product.productStatus : ""}
            </span>
          </div>

          <div className="flex items-center justify-start">
            <h1 className="text-sm text-gray-900 mr-2">Opens in:</h1>
            <h1 className="text-sm font-semibold">{product?.startTime}</h1>
          </div>

          {/* Product button*/}
          <div>
            <button
              className="secondary-button w-full"
              onClick={handleClick}
            >
              View product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
