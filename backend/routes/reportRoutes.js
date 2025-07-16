import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET low stock products
router.get('/low-stock', async (req, res) => {
  const products = await Product.find({ quantity: { $lt: 10 } });
  res.json(products);
});

// GET total value of inventory
router.get('/total-value', async (req, res) => {
  const products = await Product.find();
  const total = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  res.json({ totalValue: total });
});

export { router as default };
