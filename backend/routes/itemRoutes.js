import express from 'express';
import { addItem, getItems, updateItem, deleteItem, getitembycategoryid } from '../controllers/itemController.js';
import multer from 'multer';

const router = express.Router();

// Multer setup for file uploads
// const upload = multer({ dest: './uploads' });
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const upload = multer({ dest: 'uploads/' });

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/imagelist'); // Directory to save images
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
  });
  
  const upload = multer({ storage });

router.post('/', upload.single('image'), addItem);
router.get('/', getItems);
router.put('/:id', upload.single('image'), updateItem);
router.delete('/:id', deleteItem);
// Fetch items by category ID
router.get('items/:CId', getitembycategoryid)

export default router;  // This is a default export

