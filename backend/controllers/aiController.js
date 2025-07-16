// controllers/aiController.js
import axios from 'axios';
import Product from '../models/Product.js';
import Transaction from '../models/Transaction.js';

export const getReorderSuggestion = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const transactions = await Transaction.find({ product: productId })
      .sort({ date: -1 })
      .limit(10);

    const transactionText = transactions
      .map(
        (t) =>
          `${t.date.toISOString().split('T')[0]}: ${t.type} ${t.quantity}`
      )
      .join('\n');

    const inputText = `
You are an inventory assistant.
Product: ${product.name}
Current Quantity: ${product.quantity}
Recent Transactions:
${transactionText}

Based on this data, what quantity (if any) should be reordered to stay stocked for the next 30 days? Respond only with a number.
    `;

    const response = await axios.post(
      'https://api.together.ai/v1/chat/completions',
      {
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [
          {
            role: 'user',
            content: inputText,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const suggestion = response.data.choices[0].message.content.trim();
    res.json({ suggestion });
  } catch (error) {
    console.error('DeepSeek AI error:', error.message);
    res.status(500).json({
      message: 'AI reorder suggestion failed',
      error: error.message,
    });
  }
};
