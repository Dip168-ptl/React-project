import User from './models/User.js';


// Update user profile with an image
export const updateProfile = async (req, res) => {
    try {
      const { userId, name, email, address, contact } = req.body;
      const imagePath = req.file ? req.file.filename : null;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update fields
      if (name) user.name = name;
      if (email) user.email = email;
      if (address) user.address = address;
      if (contact) user.contact = contact;

      if (imagePath) {
        user.image = imagePath; // Save the uploaded file's name in the user document
      }
  
      await user.save();
      res.status(200).json({
        message: 'Profile updated successfully',
        user: {
          name: user.name,
          email: user.email,
          address: user.address,
          contact: user.contact,
          image: user.image,
        },
      });
  
      // res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred', error });
    }
};
