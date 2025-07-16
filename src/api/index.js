// src/api/index.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // change to your deployed backend URL if hosted
});

export const getReorderSuggestion = (productId) =>
  API.post('/ai/reorder-suggestion', { productId });

export default API;
