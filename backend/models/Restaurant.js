// models/Restaurant.js
import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  openingHours: { type: String, required: true },
  logo: { type: String }, // This will store the path to the logo image
  status: { type: String, enum: ['open', 'closed'], default: 'open' }
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
export default Restaurant;
