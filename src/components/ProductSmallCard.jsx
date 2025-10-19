import React, { useState } from 'react'
import foto from "../assets/biciklo.jpeg"
import { useNavigate } from 'react-router-dom';

const ProductSmallCard = ({product}) => {

    const navigate = useNavigate();

    const handleClick = () =>{
        navigate(`/product-details/${product.id}`);
    };
  return (
    <>
    {/* Small product card */}
    <div className="w-[180px] flex-shrink-0  bg-white rounded-lg border border-gray-200 cursor-pointer" onClick={handleClick}>

        {/* Picture */}
        <img src={foto} alt="" className="rounded-t-lg"/>

        {/* Title and description */}
        <div className="px-2 py-2">
            <div className="mb-2">
        <h1 className="text-base font-semibold text-start">{product? product.name : ""}</h1>
        <p className="text-sm text-description text-justify overflow-y-hidden">Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
            </div>

        {/* Bid status */}
        <div className="flex items-center justify-start">
            <span className="inactive-span">{product? product.productStatus : ""}   </span>
        </div>

        {/* Date and price */}
        <div className="flex items-center justify-between mt-4">
            <p className="text-description">13.10.2025</p>
            <h1 className="text-xl font-semibold">{product? product.startingPrice : ""} $</h1>
        </div>
        </div>

    </div>
    </>
  )
}

export default ProductSmallCard
