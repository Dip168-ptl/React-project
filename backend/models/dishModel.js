import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
  restaurantId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String, // Store the category name directly
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  prepTime: {
    type: Number,
    required: true,
  },
});

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;
