// import express from 'express';
// import User from '../models/User.js';  // Adjust the path according to your structure
// import authMiddleware from '../middleware/authMiddleware.js'; // Import the middleware
// import authRoutes from './routes/admin.js';


// const router = express.Router();

// // Register route
// router.post('/register', async (req, res) => {
//   const { name, email, password, address, pincode, contact } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Create a new user
//     const newUser = new User({ name, email, password, address, pincode, contact });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login route in backend (Node.js/Express)
// router.post('/login', async (req, res) => {
//   console.log('Received request body:', req.body);
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Compare the entered password with the hashed password in the database
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid password' });
//     }

//     if (req.user.role === 'admin') {
//       res.status(200).json({ message: 'Welcome Admin!' });
//       } else {
//         res.status(403).json({ message: 'Access forbidden' });
//     }

//     // If passwords match, login is successful
//     res.status(200).json({ message: 'Login successful', user: { email: user.email } });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

//   export default router;