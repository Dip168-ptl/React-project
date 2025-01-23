import Dish from '../models/dishModel.js';

// Get all dishes
export const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dishes' });
  }
};

// Add a new dish
export const addDish = async (req, res) => {
  const { restaurantId, name, categoryName, description, price, availability, prepTime } = req.body;
  const image = req.file ? req.file.filename : '';

  const newDish = new Dish({
    restaurantId,
    name,
    categoryName,
    description,
    price,
    image,
    availability,
    prepTime,
  });

  try {
    const savedDish = await newDish.save();
    res.status(201).json(savedDish);
  } catch (error) {
    res.status(500).json({ message: 'Error adding dish' });
  }
};

// Update a dish
export const updateDish = async (req, res) => {
  const { restaurantId, name, categoryName, description, price, availability, prepTime } = req.body;
  const image = req.file ? req.file.filename : req.body.image;

  try {
    const updatedDish = await Dish.findByIdAndUpdate(
      req.params.id,
      { restaurantId, name, categoryName, description, price, image, availability, prepTime },
      { new: true }
    );
    res.status(200).json(updatedDish);
  } catch (error) {
    res.status(500).json({ message: 'Error updating dish' });
  }
};

// Delete a dish
export const deleteDish = async (req, res) => {
  try {
    await Dish.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Dish deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting dish' });
  }
};
