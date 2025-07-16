import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

// GET all products
router.get('/', getProducts);

// POST create product
router.post('/', createProduct);

// PUT update product by ID
router.put('/:id', updateProduct);

// DELETE product by ID
router.delete('/:id', deleteProduct);

export default router;