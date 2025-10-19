import React from "react";

const BidSection = () => {
  return (
    <>
      {/* Bid section */}
      <div className="bg-white px-6 py-4 rounded-lg shadow-md">
        <h1 className="component-title text-start mb-4">Bids table</h1>

        {/* Bid table */}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className=" py-3">
                  Bids
                </th>
                <th scope="col" className=" py-3">
                  Date
                </th>
                <th scope="col" className=" py-3">
                  User
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b border-gray-200">
                <th
                  scope="row"
                  className="font-medium text-gray-900 whitespace-nowrap"
                >
                  550 $
                </th>
                <td className=" py-4">
                  <h1 className="text-description">24.10.2025</h1>
                </td>
                <td className=" py-4">
                  <h1 className="text-description ">mfelich</h1>
                </td>
              </tr>
              <tr className="bg-white border-b border-gray-200">
                <th
                  scope="row"
                  className="font-medium text-gray-900 whitespace-nowrap"
                >
                  490 $
                </th>
                <td className=" py-4">
                  <h1 className="text-description">24.10.2025</h1>
                </td>
                <td className=" py-4">
                  <h1 className="text-description ">unaMaki</h1>
                </td>
              </tr>
              <tr className="bg-white ">
                <th
                  scope="row"
                  className="font-medium text-gray-900 whitespace-nowrap"
                >
                  430 $
                </th>
                <td className=" py-4">
                  <h1 className="text-description">24.10.2025</h1>
                </td>
                <td className=" py-4">
                  <h1 className="text-description ">takiTaki</h1>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Place bid button*/}
      <div>
        <div className="bg-white px-6 py-4 rounded-lg shadow-md mt-2 flex items-center justify-center space-x-2">
          <input
            type="number"
            id="number-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Insert your offer"
            required
          />
          <button className="primary-button w-full">Place bid</button>
        </div>
      </div>
    </>
  );
};

export default BidSection;
