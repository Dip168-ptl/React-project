import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './aboutus.css';
import navicon from '../Assets/navicon.png'; // Ensure the logo path is correct
import Footer from './Footer';

const Aboutus = () => {
  const [showGoUpButton, setShowGoUpButton] = useState(false); // Define showGoUpButton state

      // Scroll to top function
      const scrollToTop = () => {  // Define scrollToTop function
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
  
       // Show or hide the "Go Upward" button based on scroll position
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
    <div className='container3'>
    <div className="aboutdetail"> 
    <nav className="navbarabout">
        <div className="navbar-leftabout">
        <i className="logo"></i>
        <img src={navicon} alt="nav Icon" width="60" height="60" className="navbar-icon" />
        <div className="name"> Go Fresh </div>
        </div>
        <ul className="navbar-menuabout">
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/category">Category</Link></li>
          <li><Link to="/contactus">Contact us</Link></li>
          <li><Link to="/aboutus">About us</Link></li>
          {/* <li><Link to="/orders">Orders</Link></li> */}
        </ul>
        <div className="navbar-rightabout">
          <i className="fas fa-shopping-cart cart-icon"></i> {/* Cart icon */}
          <div className="search-barabout">
            <input type="text" placeholder="Search..." className="search-input" />
            <Link to="/login" className="about-button">Login</Link>
          </div>
        </div>
      </nav>

      <div className="about-us">
      <div className="heading">
        <div className="detailabout">About GO Fresh </div>
        <div className="underlineabout"></div>
      </div>
      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          GO Fresh is a leading online food delivery service that connects you with a wide 
          variety of local and international cuisines. Our mission is to bring the best food experiences
           to your doorstep, ensuring convenience, quality, and satisfaction.
        </p>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to make delicious food accessible to everyone, anytime, anywhere. We strive to create
           a seamless and delightful experience for our customers, 
          from browsing our extensive menu to enjoying a meal in the comfort of their home.
        </p>
      </section>

      <section className="achievements-section">
        <h2>Our Achievements</h2>
        <ul>
          <li> 50+ successful deliveries</li>
          <li>Recognized for excellence in customer service</li>
        </ul>
      </section>
      <section className="call-to-action-section">
        <h2>Join Us</h2>
        <p>
          Interested in becoming a part of the GO Fresh family? We're always 
          looking for talented individuals who are passionate about food and technology. 
          Check out our careers page for current openings.
        </p>
        {/* <button className="cta-button">Explore Careers</button> */}
      </section>
      </div>
<br></br>
<br></br>
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

export default Aboutus;
