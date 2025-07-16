import express from 'express';
import Supplier from '../models/Supplier.js';

const router = express.Router();

// GET all suppliers
router.get('/', async (req, res) => {
  const suppliers = await Supplier.find();
  res.json(suppliers);
});

// POST create supplier
router.post('/', async (req, res) => {
  const { name, contact } = req.body;
  const supplier = new Supplier({ name, contact });
  await supplier.save();
  res.status(201).json(supplier);
});

// PUT update supplier
router.put('/:id', async (req, res) => {
  const updated = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE supplier
router.delete('/:id', async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.json({ message: 'Supplier deleted' });
});

// GET products by supplier (mini report)
import Product from '../models/Product.js';

router.get('/:id/products', async (req, res) => {
  const products = await Product.find({ supplier: req.params.id });
  res.json(products);
});

export default router;
