import express from 'express';
import { getItemsGroupedByCategory} from '../controllers/groupitemController.js';
import multer from 'multer';

const router = express.Router();

// Define the route for fetching grouped items
router.get('/grouped-by-category', getItemsGroupedByCategory);

export default router;
