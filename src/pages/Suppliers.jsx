import React, { useState, useEffect } from 'react';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const fetchSuppliers = () => {
    fetch('http://localhost:5000/api/suppliers')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setSuppliers(data))
      .catch(err => console.error("Error fetching suppliers:", err));
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add supplier');
      }
      setName('');
      setContact('');
      fetchSuppliers(); // Re-fetch to update the list
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/suppliers/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete supplier');
        }
        fetchSuppliers(); // Re-fetch to update the list
      } catch (error) {
        console.error("Error deleting supplier:", error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen px-8 py-10 lg:px-16 lg:py-12 bg-gray-50">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8">Suppliers</h1>

      {/* Add Supplier Form */}
      <form onSubmit={handleAdd} className="mb-10 p-6 bg-white rounded-xl shadow-md flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[150px]">
          <label htmlFor="supplierName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            id="supplierName"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-900 shadow-sm"
            type="text"
            placeholder="Supplier Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label htmlFor="supplierContact" className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
          <input
            id="supplierContact"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-900 shadow-sm"
            type="text"
            placeholder="Contact Info"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          type="submit"
        >
          Add Supplier
        </button>
      </form>

      {/* Suppliers Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden ring-1 ring-gray-900/5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {suppliers.length > 0 ? (
              suppliers.map((s) => (
                <tr
                  key={s._id}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(s._id)}
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
                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                  No suppliers found. Add one above!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}