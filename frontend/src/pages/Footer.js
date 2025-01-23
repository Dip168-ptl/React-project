import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FaEnvelope, FaArrowRight } from 'react-icons/fa';

import './footer.css';

const Footer = () => {
  // Define state variables for email and message
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Define the handleEmailSubmit function
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Logic for handling email submission
    if (email) {
      console.log(`Email submitted: ${email}`);
      setMessage('Thank you for subscribing!');
    } else {
      setMessage('Please enter a valid email.');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About GO Fresh</h4>
          <p>GO Fresh is your go-to app for delicious meals delivered right to your doorstep. We offer a variety of items to satisfy your cravings.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/category">Category</Link></li>
            <li><Link to="/contactus">Contact Us</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/orders">Orders</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul className="social-media">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook />Facebook </a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter />Twitter  </a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram />Instagram </a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: GoFreash@gmail.com</p>
          <p>Phone: +91 7650430450</p>
          <p>Address: 211 Main Street, Bardoli, India.</p>
        </div>
      <div className='sub'>
      <div className=" subscribe-section">
          <h4>Subscribe</h4>
          <form onSubmit={handleEmailSubmit} className="subscribe-form">
            <label className="email-label"></label>
              <FaEnvelope className="email-icon" />
              <input
                type="email"
                placeholder="    Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            <button type="submitemail" className="arrow-btn">
              <FaArrowRight />
            </button>
            <p> Subscribe GO Fresh email notifications to get 
              notified for all money saving and tummy filling offers.
               Enter your email address to get started.</p>
          </form>
          {message && <p className="subscribe-message">{message}</p>}
        </div>
      </div>
    </div>
      <div className="footer-bottom">
        <p className='f'>&copy; 2024 GO Fresh. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
