// src/api/api.js
const API_BASE_URL = 'http://localhost:5000/api';

export const fetchProductsApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch products');
    }
    return response.json();
  } catch (error) {
    console.error('API call error for fetching products:', error);
    throw error;
  }
};

export const createProductApi = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create product');
    }
    return response.json();
  } catch (error) {
    console.error('API call error for creating product:', error);
    throw error;
  }
};

export const deleteProductApi = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete product');
    }
    return response.json();
  } catch (error) {
    console.error('API call error for deleting product:', error);
    throw error;
  }
};

export const getReorderSuggestion = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/reorder-suggestion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get reorder suggestion');
    }

    const data = await response.json();
    return data.suggestion;
  } catch (error) {
    console.error('API call error for reorder suggestion:', error);
    throw error;
  }
};

// NEW FUNCTION: fetchLowStockProductsApi
export const fetchLowStockProductsApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/reports/low-stock`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch low stock products');
    }
    return response.json();
  } catch (error) {
    console.error('API call error for fetching low stock products:', error);
    throw error;
  }
};

// NEW FUNCTION: fetchTotalSuppliersApi (or use an existing one if you have it)
export const fetchSuppliersApi = async () => { // Reusing fetchSuppliersApi if it already exists in your original file.
  try {
    const response = await fetch(`${API_BASE_URL}/suppliers`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch suppliers');
    }
    return response.json();
  } catch (error) {
    console.error('API call error for fetching suppliers:', error);
    throw error;
  }
};