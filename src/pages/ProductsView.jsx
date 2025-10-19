import React, { useEffect, useState } from "react";
import { FaSearch, FaFilter, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SidebarFilter from "../components/ProductsView/SidebarFilter";
import ProductCard from "../components/ProductsView/ProductCard";

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (page = 0, search = "") => {
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        size: '10' // You can adjust page size as needed
      });
      
      if (search) {
        params.append('name', search);
      }

      const response = await fetch(`http://localhost:8080/api/products/all?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error while fetching products");
      }

      const data = await response.json();
      setProducts(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(data.number);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(0); // Reset to first page when searching
    fetchProducts(0, searchQuery);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page, searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(0);
    fetchProducts(0, "");
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  useEffect(() => {
    fetchProducts(0, "");
  }, []);

  return (
    <>
      {/* Page */}
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="w-full flex flex-col lg:flex-row items-start justify-between px-6 lg:px-28 gap-8">
          
          {/* Filter section (left side) - Desktop */}
          <div className="hidden lg:block w-full lg:w-3/12">
            <div className="sticky top-8">
              <SidebarFilter />
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden w-full">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
            >
              <FaFilter className="w-5 h-5" />
              <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
            </button>
          </div>

          {/* Mobile Filter Panel */}
          {showFilters && (
            <div className="lg:hidden w-full bg-white rounded-2xl shadow-xl p-6">
              <SidebarFilter />
            </div>
          )}

          {/* Product list section (right side) */}
          <div className="w-full lg:w-9/12">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              
              {/* Search input */}
              <div className="mb-8">
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative w-full max-w-[400px] mx-auto">
                    {/* Search icon */}
                    <div className="absolute inset-y-0 start-0 flex items-center pl-4 pointer-events-none">
                      <FaSearch className="w-4 h-4 text-gray-500" />
                    </div>

                    {/* Input */}
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="block w-full p-2 pl-11 text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white transition-all duration-300"
                      placeholder="Search products..."
                    />

                    {/* Button */}
                    <button
                      type="submit"
                      className="absolute right-1 top-1 bottom-1 text-purple-700 hover:text-white border border-purple-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 focus:ring-2 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-6 transition-all duration-300"
                    >
                      Search
                    </button>
                  </div>
                </form>
                
                {/* Clear search button */}
                {searchQuery && (
                  <div className="text-center mt-2">
                    <button
                      onClick={handleClearSearch}
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>

              {/* Loading state */}
              {loading && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading products...</p>
                </div>
              )}

              {/* Product card lists */}
              {!loading && (
                <div className="space-y-6 mb-8">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <div 
                        key={product.id} 
                        className="transform hover:scale-[1.02] transition-transform duration-300"
                      >
                        <ProductCard product={product} />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaSearch className="w-10 h-10 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-lg font-medium">
                        {searchQuery ? "No products found for your search." : "No products to display."}
                      </p>
                      <p className="text-gray-400 mt-2">
                        {searchQuery ? "Try adjusting your search terms." : "Products will appear here once they are available."}
                      </p>
                      {searchQuery && (
                        <button
                          onClick={handleClearSearch}
                          className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Page navigation */}
              {totalPages > 1 && !loading && (
                <div className="w-full flex items-center justify-center">
                  <nav aria-label="Page navigation">
                    <ul className="inline-flex -space-x-px text-sm shadow-lg rounded-xl overflow-hidden">
                      {/* Previous button */}
                      <li>
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 0}
                          className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          <FaArrowLeft className="w-3 h-3 mr-2" />
                          Previous
                        </button>
                      </li>

                      {/* Page numbers */}
                      {getPageNumbers().map((page) => (
                        <li key={page}>
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 transition-all duration-200 ${
                              currentPage === page
                                ? 'text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                                : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                            }`}
                          >
                            {page + 1}
                          </button>
                        </li>
                      ))}

                      {/* Next button */}
                      <li>
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages - 1}
                          className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          Next
                          <FaArrowRight className="w-3 h-3 ml-2" />
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsView;