import express from 'express';
import User from '../models/User.js'; // Adjust the path if necessary

const router = express.Router();

// Get customers only
router.get('/customers', async (req, res) => {
  try {
    // Fetch customers (filter by role)
    const customers = await User.find({ role: 'customer' }, 'name email contact');
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch customers', error });
  }
});

export default router;

