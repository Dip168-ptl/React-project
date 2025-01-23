import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';
import Contact from './models/Contactus.js'; // Adjust the path to your model
import customerRoutes from './routes/customerRoutes.js'; // Adjust path as needed

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import groupitem from './routes/groupitem.js';
import categoryRoutes from './routes/categoryRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import restaurantRoutes from './routes/restaurants.js'; // Restaurant routes
import contactus from './routes/contactus.js'; // Adjust the path to your route file

// import UserProfile from './routes/UserProfile.js';

// import authmiddleware from '../backend/middleware/authMiddleware.js';

// import authRoutes from './routes/route.js';
// import uploadRoutes from './middleware/upload.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

// Enable serving static files from the "uploads" folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads')); 





mongoose.connect(process.env.MONGO_URI="mongodb://localhost:27017/Food" ,{ /* useNewUrlParser: true, useUnifiedTopology: true */})
  .then(() => {
    console.log('Connected to MongoDB');
    createAdminUser(); // Call the function to create admin user
    createManagerUser();
    createDeliveryPersonUser(); // Call the delivery person user creation function
  })
  .catch((err) => console.log('Database connection failed:', err));

app.post('/register', async (req, res) => {
  const { name, email, password, address, pincode, contact} =  req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ name, email, password, address, pincode, contact, role: 'customer' });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }

   
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }



    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // Payload
      process.env.JWT_SECRET='cf4f3611e64b57ac862db61da5713a50d18e768e185b331c9d08b1f82ee8e1a73664483876951e163b707c87da012072af7d81f39b59f2cbf186bc9c19eaa542', // Secret key
      { expiresIn: '1h' } // Token expiration time
    );

    // Send token and user data back to the client
    return res.status(200).json({
      message: 'Login successful',
      token, // Send the JWT token
      user: { email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
    });
    

// Function to create an admin user if not exists
const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin012@gmail.com' }); // Check if admin exists
    if (!existingAdmin) {
      // const hashedPassword = await bcrypt.hash('A12admin', 10); // Hash the password
      const newAdmin = new User({
        name: 'Admin',
        email: 'admin012@gmail.com',
        password: 'A12!!admin',
        address: 'Admin HQ',
        pincode: '000000',
        contact: '0000000000',
        role: 'admin' // Set the role to admin
      });

      await newAdmin.save(); // Save admin user to database
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

// Function to create a restaurant manager user if not exists
const createManagerUser = async () => {
  try {
    const existingManager = await User.findOne({ email: 'manager110@gmail.com' }); // Check if manager exists
    if (!existingManager) {
      const newManager = new User({
        name: 'Restaurant Manager',
        email: 'manager110@gmail.com',
        password: 'RM&110xyz', // Plain text password, will be hashed
        address: '23,shivshakti soc. mahuva, bardoli',
        pincode: '674567',
        contact: '7878690035',
        role: 'restaurantManager' // Set the role to restaurant manager
      });

      await newManager.save(); // Save manager user to the database
      console.log('Manager user created successfully');
    } else {
      console.log('Manager user already exists');
    }
  } catch (error) {
    console.error('Error creating manager user:', error);
  }
}

// Function to create a delivery person user if not exists
const createDeliveryPersonUser = async () => {
  try {
    const existingDeliveryPerson = await User.findOne({ email: 'delperson318@gmail.com' }); // Check if delivery person exists
    if (!existingDeliveryPerson) {
      const newDeliveryPerson = new User({
        name: 'Delivery Person',
        email: 'delperson318@gmail.com',
        password: 'DP!318qwe', // Plain text password, will be hashed
        address: 'shri-hariom  nagar, bardoli',
        pincode: '456456',
        contact: '1237804560',
        role: 'deliveryPerson' // Set the role to delivery person
      });

      await newDeliveryPerson.save(); // Save delivery person user to the database
      console.log('Delivery person user created successfully');
    } else {
      console.log('Delivery person user already exists');
    }
  } catch (error) {
    console.error('Error creating delivery person user:', error);
  }
};

// Multer storage configuration (ES Module syntax)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, 'uploads');

//     // Check if 'uploads' directory exists, if not, create it
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }

//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// Use category routes
app.use('/api/categories', categoryRoutes);
// app.use('/api/dishes', dishRoutes);
app.use('/api/restaurants', restaurantRoutes); 
app.use('/api/items', itemRoutes);
app.use('/api/items/grouped-by-category', groupitem); // API endpoint will be `/api/items/grouped-by-category`
app.use(contactus);
// app.use(customers);
app.use('/api', customerRoutes);

app.get('/', (req, res) => {
  res.send('Contact API is running...');
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to database
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

