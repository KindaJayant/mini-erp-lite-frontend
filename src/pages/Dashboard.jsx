import React, { useState, useEffect } from "react";
import { FaBox, FaExclamationTriangle, FaUsers } from "react-icons/fa";
import { fetchProductsApi, fetchLowStockProductsApi, fetchSuppliersApi } from "../api/api" // Import new API functions

export default function Dashboard() {
  const [productsInStock, setProductsInStock] = useState(0);
  const [lowStockAlerts, setLowStockAlerts] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch Products In Stock
        const products = await fetchProductsApi();
        setProductsInStock(products.length);

        // Fetch Low Stock Alerts
        const lowStock = await fetchLowStockProductsApi();
        setLowStockAlerts(lowStock.length);

        // Fetch Total Suppliers
        const suppliers = await fetchSuppliersApi();
        setTotalSuppliers(suppliers.length);

      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <section className="w-full min-h-screen px-8 py-10 lg:px-16 lg:py-12 bg-gray-50">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8">Dashboard</h2>
        <div className="text-gray-600 text-lg">Loading dashboard data...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full min-h-screen px-8 py-10 lg:px-16 lg:py-12 bg-gray-50">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8">Dashboard</h2>
        <div className="text-red-600 text-lg">{error}</div>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen px-8 py-10 lg:px-16 lg:py-12 bg-gray-50">
      <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Adjusted grid for responsiveness */}
        {/* Products In Stock Card */}
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 border border-gray-200">
          <FaBox className="text-blue-600 text-4xl p-2 bg-blue-100 rounded-full" /> {/* Larger icon, background circle */}
          <div>
            <p className="text-gray-600 text-base font-medium">Products In Stock</p>
            <p className="text-3xl font-extrabold text-gray-900">{productsInStock}</p> {/* Larger, bolder number */}
          </div>
        </div>

        {/* Low Stock Alerts Card */}
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 border border-gray-200">
          <FaExclamationTriangle className="text-yellow-600 text-4xl p-2 bg-yellow-100 rounded-full" />
          <div>
            <p className="text-gray-600 text-base font-medium">Low Stock Alerts</p>
            <p className="text-3xl font-extrabold text-gray-900">{lowStockAlerts}</p>
          </div>
        </div>

        {/* Total Suppliers Card */}
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-4 border border-gray-200">
          <FaUsers className="text-green-600 text-4xl p-2 bg-green-100 rounded-full" />
          <div>
            <p className="text-gray-600 text-base font-medium">Total Suppliers</p>
            <p className="text-3xl font-extrabold text-gray-900">{totalSuppliers}</p>
          </div>
        </div>
      </div>
    </section>
  );
}