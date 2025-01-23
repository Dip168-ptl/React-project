import express from 'express';
import mongoose from 'mongoose';
import Contact from '../models/Contactus.js'; // Adjust the path to your model

const router = express.Router();

// POST route for submitting the contact form
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
  
    try {
      const newContact = new Contact({ name, email, message });
      await newContact.save();
      res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
      console.error('Error saving contact form data:', error);
      res.status(500).json({ error: 'Failed to save contact form data' });
    }
  });



// GET route for fetching all contact form submissions (optional)
router.get('/', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contact form data:', error);
      res.status(500).json({ error: 'Failed to fetch contact form data' });
    }
  });

export default router;
