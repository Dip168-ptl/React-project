// import multer from 'multer';
// import path from 'path';
// import User from '../models/User.js';

// // Set storage engine for multer
// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`); // Save with a timestamp to avoid conflicts
//     }
// });

// // File filter for image types
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png/; // Allow only images
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only!'); // Return an error if the file isn't an image
//     }
// };

// // Initialize upload middleware
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 }, // 1MB size limit
//     fileFilter: fileFilter,
// }).single('profilePicture'); // Single image upload

// // Function to update customer profile picture in MongoDB
// const uploadProfilePicture = async (req, res) => {
//     try {
//         const customerId = req.user.id; // Assuming you are passing user data from middleware (like JWT)
        
//         // Multer middleware to handle file upload
//         upload(req, res, async function (err) {
//             if (err) {
//                 return res.status(400).json({ message: err });
//             }

//             if (!req.file) {
//                 return res.status(400).json({ message: 'No file uploaded' });
//             }

//             // Find the customer and update the profile picture path
//             const customer = await Customer.findById(customerId);
//             if (!customer) {
//                 return res.status(404).json({ message: 'Customer not found' });
//             }

//             // Update profile picture
//             customer.profilePicture = `/uploads/${req.file.filename}`;
//             await customer.save();

//             res.status(200).json({
//                 message: 'Profile picture updated successfully',
//                 profilePicture: customer.profilePicture,
//             });
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// module.exports = uploadProfilePicture;
