import React, { useState, useEffect } from "react";
import { fetchProductsApi, createProductApi, deleteProductApi, getReorderSuggestion } from "../api/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  // State for new product form
  const [newName, setNewName] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newSupplier, setNewSupplier] = useState('');

  const fetchProducts = async () => {
    try {
      const data = await fetchProductsApi();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSuggestion = async (productId) => {
    try {
      setLoadingId(productId);
      setSuggestion("");
      const result = await getReorderSuggestion(productId);
      setSuggestion(`Suggested reorder quantity: ${result}`);
    } catch (error) {
      console.error(error);
      setSuggestion(`Error: Failed to fetch reorder suggestion`);
    } finally {
      setLoadingId(null);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const productData = {
      name: newName,
      sku: newSku,
      price: parseFloat(newPrice),
      quantity: parseInt(newQuantity),
      supplier: newSupplier,
    };

    try {
      await createProductApi(productData);
      setNewName('');
      setNewSku('');
      setNewPrice('');
      setNewQuantity('');
      setNewSupplier('');
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProductApi(id);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen px-8 py-10 lg:px-16 lg:py-12 bg-gray-50"> {/* Changed overall background */}
      <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8">Products</h1> {/* Larger, bolder title */}

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="mb-10 p-6 bg-white rounded-xl shadow-md flex flex-wrap items-end gap-4"> {/* White background, shadow, flex for alignment */}
        <div className="flex-1 min-w-[150px]"> {/* Wrap inputs for better layout */}
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            id="name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-900 shadow-sm"
            type="text"
            placeholder="Product Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
          <input
            id="sku"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-900 shadow-sm"
            type="text"
            placeholder="SKU"
            value={newSku}
            onChange={(e) => setNewSku(e.target.value)}
            required
          />
        </div>
        <div className="flex-1 min-w-[100px]">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            id="price"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-900 shadow-sm"
            type="number"
            step="0.01"
            placeholder="Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            required
          />
        </div>
        <div className="flex-1 min-w-[100px]">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <input
            id="quantity"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-900 shadow-sm"
            type="number"
            placeholder="Quantity"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            required
          />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
          <input
            id="supplier"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-900 shadow-sm"
            type="text"
            placeholder="Supplier"
            value={newSupplier}
            onChange={(e) => setNewSupplier(e.target.value)}
            required
          />
        </div>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          type="submit"
        >
          Add Product
        </button>
      </form>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden ring-1 ring-gray-900/5"> {/* Changed table container background */}
        <table className="min-w-full divide-y divide-gray-200"> {/* Added subtle dividers */}
          <thead className="bg-gray-100"> {/* Lighter header background */}
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th> {/* Darker, more prominent headers */}
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Supplier</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200"> {/* White body background, subtle dividers */}
            {products.length > 0 ? (
              products.map((p) => ( // Removed idx for simplicity, key is _id
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out" // Lighter hover effect
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td> {/* Darker text */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${p.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                    >
                      Delete
                    </button>
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                      onClick={() => handleSuggestion(p._id)}
                      disabled={loadingId === p._id}
                    >
                      {loadingId === p._id ? "Loading..." : "Suggest Reorder"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  No products found. Add one above!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {suggestion && (
        <div className="mt-8 p-4 bg-blue-100 text-blue-800 rounded-lg shadow-md"> {/* Consistent shadow, padding */}
          {suggestion}
        </div>
      )}
    </div>
  );
}