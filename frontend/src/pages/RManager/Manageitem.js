import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import navicon from '../../Assets/navicon.png'; 
import Footera from './Footera.js';
import axios from 'axios';
import './manageitem.css';

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    availability: 'Available',
    preparationTime: '',
    restaurant: '',
    category: '',
    image: null,
  });
  const [showGoUpButton, setShowGoUpButton] = useState(false); 
  const [activeMenu, setActiveMenu] = useState('Items');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false); 
  const [editItemId, setEditItemId] = useState(null); 
  const [isDeleting, setIsDeleting] = useState(false);

  
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
  } else if (menu === 'AddRestaurant') {
    navigate('/AddRestaurant'); 
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await axios.get('http://localhost:5000/api/restaurants');
        const categoryResponse = await axios.get('http://localhost:5000/api/categories');
        setRestaurants(restaurantResponse.data);
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [restaurantResponse, categoryResponse, itemResponse] = await Promise.all([
  //         axios.get('http://localhost:5000/api/restaurants'),
  //         axios.get('http://localhost:5000/api/categories'),
  //         axios.get('http://localhost:5000/api/items'),
  //       ]);
  //       setRestaurants(restaurantResponse.data);
  //       setCategories(categoryResponse.data);
  //       setItems(itemResponse.data);
  //     } catch (error) {
  //       console.error('Error fetching data', error);
  //       setErrorMessage('Error fetching data.');
  //     }
  //   };
  //   fetchData();
  // }, []);


  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const validateForm = () => {
    setErrorMessage('');
    const { name, description, price, availability, preparationTime, restaurant, category, image } = formData;

    // Validate name
    const namePattern = /^[a-zA-Z\s]{1,50}$/;
    if (!namePattern.test(name)) {
      setErrorMessage('Item name must be characters only,no special characters, no numbers, and up to 50 characters.');
      return false;
    }

    // Check if name already exists (only for new items, not for updates)
    if (!isEditing && items.some(item => item.name.toLowerCase() === name.toLowerCase())) {
      setErrorMessage('Item name already exists. Please enter a different name.');
      return false;
    }

    // Validate description (no special characters)
    const descriptionPattern = /^[a-zA-Z0-9\s]{1,350}$/;
    if (!descriptionPattern.test(description)) {
      setErrorMessage('Description can only contain letters, numbers and spaces, and must be less than or equal 350 characters, no special characters.');
      return false;
    }

    // Validate price
    const pricePattern = /^[1-9]\d{0,4}$/; 
    if (!pricePattern.test(price)) {
      setErrorMessage('Price must be a number between 1 and 1000 and cannot have repeated digits, No letters or special characters allowed.');
      return false;
    }

    // Validate availability and preparation time
    if (!availability) {
      setErrorMessage('Please select availability.');
      return false;
    }

    if (!preparationTime) {
      setErrorMessage('Please select preparation time.');
      return false;
    }

    // Validate image
    if (!image) {
      setErrorMessage('Please select an image.');
      return false;
    }

    // Validate image (only for new items)
    // if (image && isEditing) {
    //   setErrorMessage('Please select an image.');
    //   return false;
    // }
    // Validate restaurant and category
    if (!restaurant) {
      setErrorMessage('Please select a restaurant.');
      return false;
    }

    if (!category) {
      setErrorMessage('Please select a category.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      // if (!(isEditing && key === 'image' && !formData.image)) { // Skip image if editing and not updated
      //   data.append(key, formData[key]);
      // }
      data.append(key, formData[key]);
    });

    // Retain existing image if not updated during editing
    // if (isEditing && !formData.image) {
    //   data.append('image', currentItem.image); // Retain the previous image
    // }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/items/${editItemId}`, data);
        setSuccessMessage('Item updated successfully!');
        setIsEditing(false);
        setEditItemId(null);
      } else {
        await axios.post('http://localhost:5000/api/items', data);
        setSuccessMessage('Item added successfully!');
      }
      fetchItems();
      setFormData({
        name: '',
        description: '',
        price: '',
        availability: 'Available',
        preparationTime: '',
        restaurant: '',
        category: '',
        image: null,
      });
    } catch (error) {
      setErrorMessage('Error adding/updating item');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      availability: item.availability,
      preparationTime: item.preparationTime,
      restaurant: item.RestID,
      category: item.CId,
      image: null,
    });
    setIsEditing(true);
    setEditItemId(item._id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top for editing
  };

  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/items/${itemId}`);
      setSuccessMessage('Item deleted successfully!');
      fetchItems();
    } catch (error) {
      setErrorMessage('Error while deleting item');
    }finally {
      setIsDeleting(false);
    }
  };



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
                <p className="user-name"> Raj Mehta </p> {/* User Name and Role */}
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
            <li className={activeMenu === 'Items' ? 'active' : ''}>
            <button onClick={() => handleMenuClick('Items')}>Items</button>
            {activeMenu === 'Items' && (
              <div className="submenu">
              <button onClick={() => navigate("/Manageitem")}>Manage Items</button>
            </div>
            )}
            </li>
            <li className={activeMenu === 'Orders' ? 'active' : ''}>
            <button onClick={() => handleMenuClick('Orders')}>Orders</button>
              {activeMenu === 'Orders' && (
                <div className="submenu">
                  <button onClick={() => navigate("/OrderList")}>Order List</button>
                  
                  <li class="group">
                  <button onClick={() => navigate("/OrderDetails/1002")}>Order Detail</button>
    
                  </li>
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

      <div className="additem">
          <h1>Manage Items</h1>
        <div className="add-item-container">
        <h2>{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="manageitem">
            <label htmlFor="name">Item Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>

            <label htmlFor="price">Price:</label>
            <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} />

            <label htmlFor="availability">Availability:</label>
            <select id="availability" name="availability" value={formData.availability} onChange={handleChange}>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>

            <label htmlFor="preparationTime">Preparation Time:</label>
            <select id="preparationTime" name="preparationTime" value={formData.preparationTime} onChange={handleChange}>
              <option value="">Select Preparation Time</option>
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="10">20 minutes</option>
              <option value="10">30 minutes</option>
            </select>

            <label htmlFor="image">Image:</label>
            <input type="file" id="image" name="image" onChange={handleImageChange} />

            <label htmlFor="restaurant">Restaurant:</label>
            <select id="restaurant" name="restaurant" value={formData.restaurant} onChange={handleChange}>
              <option value="">Select Restaurant</option>
              {restaurants.map((rest) => (
                <option key={rest._id} value={rest._id}>{rest.name}</option>
              ))}
            </select>

            <label htmlFor="category">Category:</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select category</option>
            {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))
        }
            </select>

            <button type="submit">{isEditing ? 'Update Item' : 'Add Item'}</button>
          </div>
        </form>
        </div>
        {/* Display Items List */}

        <div className="item-list">
  <h2>Item List</h2>
  
  {items.length > 0 ? (
    <table className="item-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price(₹)</th>
          <th>Availability</th>
          <th>Preparation Time</th>
          <th>Restaurant Name</th>
          <th>Category Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          return (
            <tr key={item._id} className="item-row">
              
              <td><img src={`http://localhost:5000/uploads/imagelist/${item.image}`} className="item-image" />
              </td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.availability}</td>
              <td>{item.preparationTime} minutes</td>
              <td>{item.RestID?.name || 'N/A'}</td> {/* Restaurant name */}
              <td>{item.CId?.name || 'N/A'}</td>   {/* Category name */}
              {/* <td>{item.RestID.restaurant}</td>
              <td>{item.CId.category}</td> */}
              <td className="item-actions">
                <button className="btnediti" onClick={() => handleEdit(item)}>Update</button>
                <button className="btndeletei" onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <p>No items available</p>
  )}
</div>
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

export default AddItem;
