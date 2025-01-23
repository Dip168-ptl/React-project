// routes/restaurants.js
import express from 'express';
import Restaurant from '../models/Restaurant.js';
import multer from 'multer';
import { getrestaurants } from '../controllers/restaurantController.js';
import path from 'path';


const router = express.Router();

// Multer setup for logo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/logos'); // Uploads to 'uploads/logos' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with a timestamp
  }
});
const upload = multer({ storage });

// POST /api/restaurants - Create a new restaurant
router.post('/', upload.single('logo'), async (req, res) => {
  try {
    const { name, address, contact, openingHours, status } = req.body;
    const newRestaurant = new Restaurant({
      name,
      address,
      contact,
      openingHours,
      logo: req.file ? req.file.filename : null, // Save logo filename if uploaded
      status
    });
    
    await newRestaurant.save(); // Save the restaurant to the database
    res.status(201).json({ message: 'Restaurant created successfully!', restaurant: newRestaurant });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all restaurants
router.get('/', getrestaurants);

export default router;
