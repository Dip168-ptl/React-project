import Restaurant from '../models/Restaurant.js';

// Get All Categories
export const getrestaurants = async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      res.status(200).json(restaurants);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching restaurants'  });
    }
  };