import React, { useState } from 'react';
import { FaFilter, FaDollarSign, FaSortAmountDown, FaTags } from 'react-icons/fa';

const SidebarFilter = () => {
  const [filters, setFilters] = useState({
    productType: 'all',
    sortBy: 'current-biddable',
    priceRange: {
      min: '',
      max: ''
    }
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePriceChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
  };

  const handleApplyFilters = () => {
    console.log('Applied filters:', filters);
    // Here you would typically pass filters to parent component or API
  };

  const handleResetFilters = () => {
    setFilters({
      productType: 'all',
      sortBy: 'current-biddable',
      priceRange: {
        min: '',
        max: ''
      }
    });
  };

  const productOptions = [
    { value: 'all', label: 'All Products' },
    { value: 'homes', label: 'Real Estate' },
    { value: 'cars', label: 'Vehicles' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'collectibles', label: 'Collectibles' }
  ];

  const sortOptions = [
    { value: 'current-biddable', label: 'Currently Biddable' },
    { value: 'future-bids', label: 'Future Auctions' },
    { value: 'ending-soon', label: 'Ending Soon' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <FaFilter className="w-5 h-5 text-white" />
          <h2 className="text-xl font-bold text-white">Filters</h2>
        </div>
        <p className="text-purple-100 text-sm mt-1">
          Refine your search results
        </p>
      </div>

      {/* Filter Content */}
      <div className="p-6 space-y-8">
        {/* Product Type Filter */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FaTags className="w-4 h-4 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Product Type</h3>
          </div>
          
          <div className="space-y-3">
            {productOptions.map((option) => (
              <label 
                key={option.value}
                className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-all duration-200 group"
              >
                <div className="relative">
                  <input 
                    type="radio" 
                    name="productType"
                    value={option.value}
                    checked={filters.productType === option.value}
                    onChange={(e) => handleFilterChange('productType', e.target.value)}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500 focus:ring-2"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort By Filter */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FaSortAmountDown className="w-4 h-4 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Sort By</h3>
          </div>
          
          <div className="space-y-3">
            {sortOptions.map((option) => (
              <label 
                key={option.value}
                className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-all duration-200 group"
              >
                <div className="relative">
                  <input 
                    type="radio" 
                    name="sortBy"
                    value={option.value}
                    checked={filters.sortBy === option.value}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500 focus:ring-2"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FaDollarSign className="w-4 h-4 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Price Range</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Minimum Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Maximum Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white"
                    placeholder="10000"
                    min="0"
                  />
                </div>
              </div>
            </div>
            
            {/* Price range visual indicator */}
            <div className="pt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>${filters.priceRange.min || '0'}</span>
                <span>${filters.priceRange.max || 'No limit'}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: filters.priceRange.max ? 
                      `calc(${(Math.min(parseInt(filters.priceRange.max) || 0, 10000) / 10000) * 100}%)` : '100%' 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 space-y-3">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
        >
          Apply Filters
        </button>
        
        <button
          onClick={handleResetFilters}
          className="w-full bg-white text-gray-700 py-3 px-4 rounded-xl font-semibold border border-gray-300 hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default SidebarFilter;