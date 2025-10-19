import React from "react";

const ProductHeader = ({name, description}) => {
  


  return (
    <>
      <div className="w-full mb-4">
        <h1 className="text-2xl font-bold text-start mb-2">
          {name}
        </h1>
        <p className="text-description text-start">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, aliquam
          quaerat. Quas quidem dolore inventore laudantium unde porro
          praesentium suscipit quam.
        </p>
      </div>
    </>
  );
};

export default ProductHeader;
