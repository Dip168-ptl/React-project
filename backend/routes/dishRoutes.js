import express from 'express';
import multer from 'multer';
import { getDishes, addDish, updateDish, deleteDish } from '../controllers/dishController.js';

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Dish Routes
router.get('/', getDishes);
router.post('/', upload.single('image'), addDish);
router.put('/:id', upload.single('image'), updateDish);
router.delete('/:id', deleteDish);

export default router;
