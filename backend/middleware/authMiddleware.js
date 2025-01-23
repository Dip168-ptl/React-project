// middleware/authmiddleware.js
import jwt from 'jsonwebtoken';
// import Customer from '../models/Customer';

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET=""); // Verify token
    req.user = verified; // Attach user info to the request
    next(); // Continue to the next middleware
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authMiddleware;

// const jwt = require('jsonwebtoken');

// Authentication middleware
// const authMiddleware = async (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Bearer token format

//   if (!token) {
//       return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//       // Verify the token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Attach the user to the request object
//       const customer = await Customer.findById(decoded.id);
//       if (!customer) {
//           return res.status(404).json({ message: 'User not found' });
//       }

//       req.user = customer;
//       next();
//   } catch (err) {
//       res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// export default authMiddleware;
