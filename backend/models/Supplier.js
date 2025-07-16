import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  products: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('Supplier', supplierSchema);
