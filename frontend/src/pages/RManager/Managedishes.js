import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import navicon from '../../Assets/navicon.png'; // Adjust path as needed
import axios from 'axios';
import './managedishes.css'; 
import Footera from './Footera.js';

const ManageDishes = () => {
    const [showGoUpButton, setShowGoUpButton] = useState(false); // Define showGoUpButton state
    const [activeMenu, setActiveMenu] = useState('Dishes');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

  const [categories, setCategories] = useState([]); // Hold categories for dropdown
  const [dishes, setDishes] = useState([]); // Hold dishes
  const [formData, setFormData] = useState({
    restaurantId: '',
    name: '',
    categoryName: '', // Store category name here
    description: '',
    price: '', // Price input as text
    availability: true,
    prepTime: '', // Preparation time as text
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [selectedDish, setSelectedDish] = useState(null); // Track selected dish for editing

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

  // Function to handle menu click
const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (menu === 'Dashboard') {
      navigate('/managerdash'); // Redirect to the dashboard page
    }
    // Add more conditions for other menu items if needed
    };
  
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
    navigate('/login'); // Redirect to home or login page after logout
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
    

  // Fetch categories for dropdown
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data); // Set categories in state
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  // Fetch dishes to display
  const fetchDishes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dishes');
      setDishes(response.data); // Set dishes in state
    } catch (error) {
      console.error('Error fetching dishes', error);
    }
  };

  // Handle form input changes
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image input separately
  const onImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Manually validate price and prepTime as positive numbers
    if (parseFloat(formData.price) <= 0 || isNaN(formData.price)) {
      alert('Please enter a valid positive price.');
      return;
    }
    if (parseFloat(formData.prepTime) <= 0 || isNaN(formData.prepTime)) {
      alert('Please enter a valid positive preparation time.');
      return;
    }

    const dishData = new FormData();
    dishData.append('restaurantId', formData.restaurantId);
    dishData.append('name', formData.name);
    dishData.append('categoryName', formData.categoryName); // Just category name
    dishData.append('description', formData.description);
    dishData.append('price', formData.price);
    dishData.append('availability', formData.availability);
    dishData.append('prepTime', formData.prepTime);
    if (formData.image) dishData.append('image', formData.image);

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/dishes/${selectedDish._id}`, dishData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setIsEditing(false);
        setSelectedDish(null);
      } else {
        await axios.post('http://localhost:5000/api/dishes', dishData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      fetchDishes(); // Refresh dishes
    } catch (error) {
      console.error('Error adding/updating dish', error);
    }
  };

  // Handle dish deletion
  const onDelete = async (dishId) => {
    try {
      await axios.delete(`http://localhost:5000/api/dishes/${dishId}`);
      fetchDishes(); // Refresh dishes
    } catch (error) {
      console.error('Error deleting dish', error);
    }
  };

  // Handle edit click
  const onEdit = (dish) => {
    setIsEditing(true);
    setSelectedDish(dish);
    setFormData({
      restaurantId: dish.restaurantId,
      name: dish.name,
      categoryName: dish.categoryName,
      description: dish.description,
      price: dish.price,
      availability: dish.availability,
      prepTime: dish.prepTime,
      image: null,
    });
  };

  useEffect(() => {
    fetchCategories(); // Load categories on component mount
    fetchDishes(); // Load dishes on component mount
  }, []);

  return (
    <div className="restaurant-manager">
    {/* Navbar from Home page with updated menu */}
    <nav className="navbar">
      <div className="navbar-left">
        <i className="logo"></i>
        <img src={navicon} alt="nav Icon" width="60" height="60" className="navbar-icon" />
        <div className="name">Go Fresh</div>
      </div>
      <div className="navbar-right">
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        <div className="user-info" onClick={toggleDropdown} ref={dropdownRef}>
          <i className="fas fa-user-circle user-icon1"></i>
          {/* User Icon */}
          <div>
            <p className="user-name"> Raj Mehta</p> {/* User Name and Role */}
            <p className="username"> Manager </p>

            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>

    {/* Sidebar */}
    <div className="sidebar">
      <ul className="sidebar-menu">
      <li className={activeMenu === 'Dashboard' ? 'active' : ''}>
          <button onClick={() => handleMenuClick('Dashboard')}>Dashboard</button>
        </li>
        <li className={activeMenu === 'Category' ? 'active' : ''}>
          <button onClick={() => navigate('/Rcategory')}>Category</button>
        </li>
        <li className={activeMenu === 'Dishes' ? 'active' : ''}>
            <button onClick={() => handleMenuClick('Dishes')}>Dishes</button>
            {activeMenu === 'Dishes' && (
              <div className="submenu">
              <button onClick={() => navigate("/DishList")}>Dishes List</button>
              <button onClick={() => navigate("/Managedishes")}>Manage Dishes</button>
            </div>
            )}
          </li>
        <li className={activeMenu === 'Orders' ? 'active' : ''}>
        <button onClick={() => handleMenuClick('Orders')}>Orders</button>
        {activeMenu === 'Orders' && (
            <div className="submenu">
              <button onClick={() => navigate("/OrderList")}>Order List</button>

              <button onClick={() => navigate("/OrderDetails/1002")}>Order Detail</button>
            </div>
          )}          
        </li>
          <li className={activeMenu === 'Customers' ? 'active' : ''}>
            <button onClick={() => navigate("/CustomerList")}>Customers</button>
          </li>
          <li className={activeMenu === 'Restaurant' ? 'active' : ''}>
            <button onClick={() => navigate("/AddRestaurant")}>Restaurant</button>
          </li>
        <li className={activeMenu === 'Profile' ? 'active' : ''}>
        <button onClick={() => navigate("/Profile")}>Profile</button>
        </li>
        <li>
        <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
    
    <div className="containerdishes">
      <h1>Manage Dishes</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="restaurantId"
          placeholder="Restaurant ID"
          value={formData.restaurantId}
          onChange={onChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Dish Name"
          value={formData.name}
          onChange={onChange}
          required
        />
        <select name="categoryName" value={formData.categoryName} onChange={onChange} required>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <textarea 
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={onChange}
        />
        <input
          type="text" // Changed from number to text to allow manual input without restrictions
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={onChange}
          required
        />
        <input
          type="text" // Changed from number to text to allow manual input without restrictions
          name="prepTime"
          placeholder="Preparation Time (minutes)"
          value={formData.prepTime}
          onChange={onChange}
          required
        />
        <input type="file" name="image" onChange={onImageChange} />
        <button type="submit">{isEditing ? 'Update Dish' : 'Add Dish'}</button>
      </form>

      <h2>Dishes</h2>
      <ul>
        {dishes.map((dish) => (
          <li key={dish._id}>
            <h3>{dish.name}</h3>
            <p>Category: {dish.categoryName}</p>
            <p>Price: ${dish.price}</p>
            <button onClick={() => onEdit(dish)}>Edit</button>
            <button onClick={() => onDelete(dish._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    <Footera/>
      {/* "Go Upward" Button */}
      {showGoUpButton && (
        <button className="go-up-button" onClick={scrollToTop}>
          ↑ 
        </button>
      )}
    </div>
  );
};

export default ManageDishes;
