// import express from 'express';
// import multer from 'multer';
// import Restaurant from '../models/Restaurant.js';

// const router = express.Router();

// // Configure Multer storage for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');  // Save files to 'uploads' directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);  // Save the file with a unique name
//   }
// });

// const upload = multer({ storage: storage });

// // Route to add a new restaurant with a logo upload
// router.post('/restaurants', upload.single('logo'), async (req, res) => {
//   try {
//     const { name, managerId, address, contact, openingHours, status } = req.body;
//     const logo = req.file ? req.file.filename : null;  // If a file is uploaded, get the filename

//     // Create a new restaurant document
//     const newRestaurant = new Restaurant({
//       name,
//       managerId,
//       address,
//       contact,
//       openingHours,
//       logo,
//       status
//     });

//     // Save the restaurant to the database
//     const savedRestaurant = await newRestaurant.save();
//     res.status(201).json(savedRestaurant);  // Return the saved restaurant as a response
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;
