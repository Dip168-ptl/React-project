import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: String, enum: ['Available', 'Not Available'], default: 'Available' },
  preparationTime: { type: Number, required: true },
  RestID: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  CId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String },
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
