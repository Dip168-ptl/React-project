import Category from '../models/Category.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const category = new Category({ name, description, image });
    await category.save();
    

    res.status(201).json({ message: 'Category created successfully', category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : req.body.image;;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name || category.name;
    category.description = description || category.description;
    if (image) category.image = image;

    await category.save();

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
