import React, { useState, useEffect } from 'react';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]); // State to store products for dropdown
  const [selectedProductId, setSelectedProductId] = useState(''); // Changed from 'product' to avoid confusion with product object
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');

  // Fetch transactions with populated product details
  const fetchTransactions = () => {
    fetch('http://localhost:5000/api/transactions')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  };

  // Fetch products for the dropdown
  const fetchProductsForDropdown = () => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products for dropdown:", err));
  };

  useEffect(() => {
    fetchTransactions();
    fetchProductsForDropdown(); // Fetch products when component mounts
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: selectedProductId, // Use selectedProductId
          quantity: parseInt(quantity),
          type,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add transaction');
      }
      setSelectedProductId(''); // Clear selected product
      setQuantity('');
      setType('');
      fetchTransactions(); // Re-fetch transactions to update the list
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction? This will revert stock changes.")) {
      try {
        const response = await fetch(`http://localhost:5000/api/transactions/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete transaction');
        }
        fetchTransactions(); // Re-fetch transactions to update the list
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen px-8 py-10 lg:px-16 lg:py-12 bg-gray-50">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8">Transactions</h1>

      {/* Add Transaction Form */}
      <form onSubmit={handleAdd} className="mb-10 p-6 bg-white rounded-xl shadow-md flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[150px]">
          <label htmlFor="productSelect" className="block text-sm font-medium text-gray-700 mb-1">Product</label>
          <select
            id="productSelect"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-900 shadow-sm"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            required
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product._id} value={product._id}>
                {product.name} ({product.sku})
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[100px]">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <input
            id="quantity"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-900 shadow-sm"
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="flex-1 min-w-[100px]">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            id="type"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-900 shadow-sm"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
          </select>
        </div>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          type="submit"
        >
          Add Transaction
        </button>
      </form>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden ring-1 ring-gray-900/5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.length > 0 ? (
              transactions.map((t) => (
                <tr
                  key={t._id}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {t.product?.name || t.product} {/* Display product name if populated, otherwise ID */}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      t.type === 'OUT' ? 'text-red-500' : 'text-green-600' // Stronger color for IN/OUT
                    }`}
                  >
                    {t.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                    >
                      Delete
                    </button>
                    {/* Add Edit button functionality here later */}
                    <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  No transactions found. Add one above!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}