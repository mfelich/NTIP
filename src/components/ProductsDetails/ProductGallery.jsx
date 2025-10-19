import React from 'react'
import foto from '../../assets/biciklo.jpeg'
import icon from '../../assets/react.svg'

const ProductGallery = () => {
  return (
    <div className="">
        <div className="w-full bg-red-400 rounded-md shadow-md">
            <img src={foto} alt="" className="h-[450px] w-full rounded-md"/>
        </div>

        <div className='mt-4 flex items-center justify-between space-x-6'>
            <div className="w-3/12 bg-blue-500 rounded-md">
            <img src={icon} alt="" className="h-[100px] w-full shadow-md"/>
            </div>

            <div className="w-3/12 bg-blue-500 rounded-md">
            <img src={icon} alt="" className="h-[100px] w-full shadow-md"/>
            </div>

            <div className="w-3/12 bg-blue-500 rounded-md">
            <img src={icon} alt="" className="h-[100px] w-full hadow-md"/>
            </div>

            <div className="w-3/12 bg-blue-500 rounded-md">
            <img src={icon} alt="" className="h-[100px] w-full shadow-md"/>
            </div>
        </div>
    </div>
  )
}

export default ProductGallery
