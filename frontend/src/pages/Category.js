import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import navicon from '../Assets/navicon.png'; // Ensure the logo path is correct
import Footer from './Footer';

import axios from 'axios';
import './category.css';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For user dropdown
  const dropdownRef = useRef(null); // Reference for dropdown outside click detection
  const [showGoUpButton, setShowGoUpButton] = useState(false); // Show/hide scroll to top button
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Handle scroll to toggle 'Go Upward' button
useEffect(() => {
  const handleScroll = () => {
    setShowGoUpButton(window.scrollY > 300);
  };

  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

// Function to toggle user dropdown
const toggleDropdown = () => {
  setIsDropdownOpen((prev) => !prev);
};

// Function to close dropdown if clicked outside
const handleOutsideClick = (e) => {
  if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
    setIsDropdownOpen(false);
  }
};


  // Handle logout functionality
  const handleLogout = () => {
    // Perform logout actions here
    navigate('/'); // Redirect to home or login page after logout
  };

useEffect(() => {
  document.addEventListener('click', handleOutsideClick);
  return () => {
    document.removeEventListener('click', handleOutsideClick);
  };
}, []);





  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch items for the selected category
  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get(`http://localhost:5000/api/items`); /*/${categoryId} */
      setItems(response.data);
    } catch (error) {
      setErrorMessage('Error fetching items. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Add to Cart
  const handleAddToCart = (item) => {
    alert(`${item.name} added to cart!`);
  };

  // Order Now
  const handleOrderNow = (item) => {
    alert(`Order placed for ${item.name}!`);
  };

  return (
    <div className="category-page">
      {/* Navbar */}
      <nav className="navbarcat">
        <div className="navbar-leftc">
          <img src={navicon} alt="nav Icon" width="60" height="60" className="navbar-icon" />
          <div className="name"> Go Fresh </div>
        </div>
        <ul className="navbar-menuc">   
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/category">Category</Link></li>
          <li><Link to="/contactus">Contact Us</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
        </ul>
        <div className="navbar-rightc">
        {/* <i className="fas fa-shopping-cart cart-icon"></i> */}
        {/* <div className="search-barc">
          <input type="text" placeholder="Search..." className="search-input" />
          <Link to="/login" className="cat-button">Login</Link>
        </div> */}
        <i className="fas fa-shopping-cart cart-icon"></i>
          <div className="search-barc">
            <input type="text" placeholder="Search..." className="search-input" />
          </div> 
          <Link to="/login" className="login-btn">Login</Link>

          {/* <i className="fas fa-user-circle user-icon" onClick={toggleDropdown} ref={dropdownRef}></i>
          {isDropdownOpen && (
            <div className="user-menu">
              <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/recent-orders">Recent Orders</Link></li>
                <li><Link to="/saved-addresses">Saved Addresses</Link></li>
                <li><Link to="/account-details">Account Details</Link></li>
                <li><Link to="/favorites">Favorites</Link></li>
                <li><Link to="/quick-actions">Quick Actions</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          )} */}
        </div>
      </nav>

    <div className="category-content">
      <h1>Categories</h1>
      <div className="categories-list">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="category-items"
              onClick={() => handleCategoryClick(category._id)}
            >
              <img
                src={`http://localhost:5000/uploads/${category.image}`}
                alt={category.name}
                className="category-image"
              />
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>

      {selectedCategory && (
        <div className="items-section">
          <h2>Items  </h2>
          {/* <h2>Items in {categories.find((cat) => cat._id === selectedCategory)?.name}</h2> */}

          {loading ? (
            <p>Loading items...</p>
          ) : errorMessage ? (
            <p style={{ color: 'red' }}>{errorMessage}</p>
          ) : items.length > 0 ? (
            <div className="items-grid">
              {items.map((item) => (
                <div key={item._id} className="item-card">
                  <img
                    src={`http://localhost:5000/uploads/imagelist/${item.image}`}
                    alt={item.name}
                    className="item-image"
                  />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: ₹{item.price}</p>
                  <p>Preparation Time: {item.preparationTime} mins</p>
                  <div className="cat-actions">
                    <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    <button onClick={() => handleOrderNow(item)}>Order Now</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No items available for this category</p>
          )}
        </div>
      )}
    </div>
    <Footer />

{/* "Go Upward" Button */}
{showGoUpButton && (
  <button className="go-up-button" onClick={scrollToTop}>
    ↑
  </button>
)}
    </div>
  );
};

export default Category;
