import Item from '../models/Item.js';
// import path from 'path';
// import { fileURLToPath } from 'url';


// Get __dirname equivalent in ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Add new item
export const addItem = async (req, res) => {
    try {
      const { name, description, price, availability, preparationTime, restaurant, category } = req.body;
      const image = req.file.filename; // Save only the filename

      const newItem = new Item({
        name,
        description,
        price,
        availability,
        preparationTime,
        RestID: restaurant,
        CId: category,
        image,
      });
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: 'Error adding item', error });
    }

    // if (isNaN(price) || price <= 0) {
    //     return res.status(400).json({ error: 'Price must be a positive number' });
    //   }
      
  };
  

  
  // Update item
  export const updateItem = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, availability, preparationTime, restaurant, category } = req.body;
  
      const updatedData = {
        name,
        description,
        price,
        availability,
        preparationTime,
        RestID: restaurant,
        CId: category,
      };
  
      if (req.file) {
        updatedData.image = `/uploads/${req.file.filename}`;
      }
  
      const updatedItem = await Item.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: 'Error updating item', error });
    }
  };
  
  // Delete item
  export const deleteItem = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedItem = await Item.findByIdAndDelete(id);
  
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting item', error });
    }
  };

// Get all items
export const getItems = async (req, res) => {
    try {
      const items = await Item.find().populate('RestID', 'name').populate('CId', 'name'); // Populating restaurant and category info
      res.status(200).json(items);

      // Add the image URL dynamically
    // const updatedItems = items.map(item => ({
    //   ...item._doc, // Spread the existing fields
    //   image: `${req.protocol}://${req.get('host')}/uploads/${item.image}`,
    // }));

    // res.status(200).json(updatedItems);

    } catch (error) {
      res.status(500).json({ message: 'Error fetching items', error });
    }
};

// Fetch items by category ID
export const getitembycategoryid = async (req, res) => {
  try {
    const { CId } = req.params;
    // const items = await Item.find({ category: categoryId, availability: 'Available' }); // Adjust field names if needed
    const items = await Item.find().populate('CId', 'name');
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items by category:', error);
    res.status(500).json({ message: 'Error fetching items by category' });
  }
};


  