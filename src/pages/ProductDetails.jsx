import React, { useEffect, useState } from "react";
import ProductHeader from "../components/ProductsDetails/ProductHeader";
import UserSmallCard from "../components/ProductsDetails/UserSmallCard";
import ProductGallery from "../components/ProductsDetails/ProductGallery";
import ProductInfo from "../components/ProductsDetails/ProductInfo";
import BidSection from "../components/ProductsDetails/BidSection";
import ProductTags from "../components/ProductsDetails/ProductTags";
import ProductDescription from "../components/ProductsDetails/ProductDescription";
import CommentSection from "../components/ProductsDetails/CommentSection";
import UserOtherListings from "../components/UserOtherListings";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [error, setError] = useState();
  const { productId } = useParams();

  const fetchProduct = async () => {
    setError("");
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/api/products/${productId}`,
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
      setProduct(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
    }
  };

  useEffect(() => {
    if (!productId) return;
    fetchProduct();
  }, [productId]);

  return (
    <>
      <div className="w-full flex px-20 space-x-10 items-start mt-8">
        <div className="w-8/12">
          <div className="bg-white px-6 py-4 rounded-md shadow-md">
            <ProductHeader name={product?.name} description={product?.description} />
            <ProductGallery></ProductGallery>
          </div>

          <ProductTags></ProductTags>
          <ProductDescription></ProductDescription>
          <CommentSection productId={product?.id}></CommentSection>
          <UserOtherListings userId={product?.userDto.id}></UserOtherListings>
        </div>

        <div className="w-4/12">
          <UserSmallCard userId={product?.userDto.id} username={product?.userDto.username} email={product?.userDto.email}></UserSmallCard>
          <ProductInfo bidStatus={product?.productStatus} startingPrice={product?.startingPrice} closesIn={product?.endTime}></ProductInfo>
          <BidSection></BidSection>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
