import express from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import multer from 'multer';

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Route to create a category
router.post('/', upload.single('image'), createCategory);

// Route to get all categories
router.get('/', getCategories);

// Route to update a category
router.put('/:id', upload.single('image'), updateCategory);

// Route to delete a category
router.delete('/:id', deleteCategory);

export default router;
