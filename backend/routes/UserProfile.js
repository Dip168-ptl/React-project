// routes/admin.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { updateProfile } from '../controllers/userProfileController.js';


const router = express.Router();

// Set storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File filter to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and JPG formats are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Update user profile with an image
router.post('/', upload.single('image'), updateProfile); 


module.exports = router;