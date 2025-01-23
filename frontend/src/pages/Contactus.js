import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Add this line
import './contactus.css'; // Ensure you create and style this CSS file
import navicon from '../Assets/navicon.png'; // Ensure the logo path is correct
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios'; // Import Axios for API requests

import Footer from './Footer';


const ContactUs = () => {
  const [showGoUpButton, setShowGoUpButton] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(''); // For displaying success/error messages
  const [statusType, setStatusType] = useState(''); // Type of message (success or error)

  const validateForm = () => {
    const errors = {};

    // Name validation: No digits allowed
    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errors.name = 'Name must only contain letters.';
    }

    // Email validation: Must be a valid email and not contain "000"
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    } else if (/000/.test(formData.email)) {
      errors.email = 'Email cannot contain "000".';
    }

    // Message validation: No special characters allowed
    if (!formData.message.trim()) {
      errors.message = 'Message is required.';
    } else if (!/^[A-Za-z0-9\s.,!?]+$/.test(formData.message)) {
      errors.message = 'Message must not contain special characters.';
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData); // Replace with your backend URL
      if (response.status === 201) {
        setStatusMessage('Your message has been successfully submitted!');
        setStatusType('success');
        setFormData({ name: '', email: '', message: '' }); // Clear the form
      }
    } catch (error) {
      setStatusMessage('Failed to send your message. Please try again later.');
      setStatusType('error');
      console.error('Error submitting form:', error);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowGoUpButton(true);
      } else {
        setShowGoUpButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container4">
    <div className="contact-us-page">
    <nav className="navbarcon">
      <div className="navbar-leftcon">
      <i className="logo"></i>
      <img src={navicon} alt="nav Icon" width="60" height="60" className="navbar-icon" />
      <div className="name"> Go
            Fresh 
            </div>
      </div>
      <ul className="navbar-menucon">
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/category">Category</Link></li>
        <li><Link to="/contactus">Contact us</Link></li>
        <li><Link to="/aboutus">About us</Link></li>
        {/* <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/Customer_dash">Dashboard</Link></li> */}
        {/* <li><Link to="/managerdash">RestaurantManager</Link></li> */}
      </ul>
      <div className="navbar-rightcon">
        <i className="fas fa-shopping-cart cart-icon"></i>
        <div className="search-barcon">
          <input type="text" placeholder="Search..." className="search-input" />
          <Link to="/login" className="con-button">Login</Link>
       </div>
      </div>
    </nav>

    <div className="contact-us">
      <div className="contact">
        <div className="detailcon">Contact Us</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-groupcon">
          <label htmlFor="name">Name </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-groupcon">
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-groupcon">
          <label htmlFor="message">Message </label>
          <div className="inputcon">
              <textarea id="textarea" name="message" rows="8" cols="120" value={formData.message}
              onChange={handleChange} placeholder="Enter message"required/>
          </div>
        <button type="send">send </button>
        </div>
      </form>

      {/* Status Message */}
      {statusMessage && (
            <div className={`status-message ${statusType}`}>
              {statusMessage}
            </div>
          )}
    </div>
     {/* Contact Info Section */}
     <div className="contact-info-row">
            <div className="info-item">
              <FaPhone className="info-icon" />
              <h3>Call Us</h3>
              <p>+91 7650430450</p>
            </div>
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <h3>Email</h3>
              <p>GoFreash@gmail.com</p>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <h3>Address</h3>
              <p>211 Main Street, Bardoli, India</p>
            </div>
      </div>


    <Footer />
     {/* "Go Upward" Button */}
     {showGoUpButton && (
        <button className="go-up-button" onClick={scrollToTop}>
          ↑ 
        </button>
      )}     
    </div>
  </div>
  );
};

export default ContactUs;
