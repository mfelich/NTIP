import React from 'react'

const ProductInfo = ({bidStatus, startingPrice, closesIn}) => {
  return (
    <>
    <div className="my-8">

     <div className="space-y-2">

        <div className="flex items-center justify-start">
            <h1 className="text-base mr-2">Bid status:</h1>
            <span className="inactive-span">{bidStatus}</span>
        </div>

        <div className="flex items-center justify-start">
            <h1 className="text-base mr-2">Closes in:</h1>
            <h1 className="text-base">{closesIn}</h1>
        </div>
        </div>

        <div className="flex items-center justify-start mt-8 mb-8">
            <h1 className="text-base mr-2">Starting price:</h1>
            <h1 className="text-2xl font-bold">{startingPrice} $</h1>
        </div>

    </div>
    </>
  )
}

export default ProductInfo
