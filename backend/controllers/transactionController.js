import Transaction from '../models/Transaction.js'
import Product from '../models/Product.js'

// Get all transactions with populated product details
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('product')
    res.json(transactions)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Create transaction + adjust product stock
export const createTransaction = async (req, res) => {
  try {
    const { product: productId, quantity, type } = req.body

    // Make sure product exists
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // Adjust stock
    if (type === 'OUT') {
      if (product.quantity < quantity) {
        return res.status(400).json({ message: 'Not enough stock' })
      }
      product.quantity -= quantity
    } else if (type === 'IN') {
      product.quantity += quantity
    } else {
      return res.status(400).json({ message: 'Invalid transaction type' })
    }

    await product.save()

    // Create transaction
    const newTransaction = new Transaction(req.body)
    const saved = await newTransaction.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Update transaction + adjust stock difference
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    const product = await Product.findById(transaction.product)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // Reverse old transaction
    if (transaction.type === 'OUT') {
      product.quantity += transaction.quantity
    } else if (transaction.type === 'IN') {
      product.quantity -= transaction.quantity
    }

    // Apply new transaction
    const { quantity, type } = req.body

    if (type === 'OUT') {
      if (product.quantity < quantity) {
        return res.status(400).json({ message: 'Not enough stock for update' })
      }
      product.quantity -= quantity
    } else if (type === 'IN') {
      product.quantity += quantity
    } else {
      return res.status(400).json({ message: 'Invalid transaction type' })
    }

    await product.save()

    // Update transaction
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Delete transaction + revert stock
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    const product = await Product.findById(transaction.product)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // Revert stock change
    if (transaction.type === 'OUT') {
      product.quantity += transaction.quantity
    } else if (transaction.type === 'IN') {
      product.quantity -= transaction.quantity
    }

    await product.save()
    await Transaction.findByIdAndDelete(req.params.id)

    res.json({ message: 'Transaction deleted & stock reverted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
