import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import navicon from '../../Assets/navicon.png'; // Adjust path as needed
import axios from 'axios';
import './Rcategory.css';
import Footera from './Footera.js';

const CategoryPage = () => {
  const [showGoUpButton, setShowGoUpButton] = useState(false); // Define showGoUpButton state
  const [activeMenu, setActiveMenu] = useState('Category');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]); // To hold category data
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category for editing

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

useEffect(() => {
  document.addEventListener('click', handleOutsideClick);
  return () => {
    document.removeEventListener('click', handleOutsideClick);
  };
}, []);


// Handle logout functionality
const handleLogout = () => {
  // Perform logout actions here
  navigate('/login'); // Redirect to home or login page after logout
};


  // Handle input changes
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle image input separately
  const onImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  // Handle form submission (add or update)
  const onSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update existing category
      console.log('Updating category:', formData);
      await updateCategory(selectedCategory._id, formData);
      setIsEditing(false);
      setSelectedCategory(null);
    } else {
      // Add new category
      console.log('Adding new category:', formData);
      await addCategory(formData);
    }

    // Reset the form after submission
    setFormData({
      name: '',
      image: '',
      description: ''
    });

    // Fetch updated categories
    await fetchCategories();
  };

// Handle category deletion
const onDelete = async (categoryId) => {
  const isConfirmed = window.confirm('Are you sure you want to delete this category?');
  if (!isConfirmed) {
    return; // Exit if the user cancels the confirmation
  }

  try {
    console.log('Deleting category:', categoryId);
    await deleteCategory(categoryId);
    await fetchCategories(); // Refresh the list after deleting
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};

  // Handle edit button click
  const onEdit = (category) => {
    setIsEditing(true);
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      image: category.image,
      description: category.description
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top for editing
  };

  // Fetch categories from the server
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data); // Set the categories in state
      console.log('Fetched categories:', response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Add a new category
  const addCategory = async (formData) => {
    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('description', formData.description);
      if (formData.image) formDataObj.append('image', formData.image);

      const response = await axios.post('http://localhost:5000/api/categories', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Category added:', response.data);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  // Update a category
  const updateCategory = async (id, formData) => {
    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('description', formData.description);
      if (formData.image) formDataObj.append('image', formData.image);

      const response = await axios.put(`http://localhost:5000/api/categories/${id}`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Category updated:', response.data);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  // Delete a category
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      console.log('Category deleted');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Load categories when component mounts
  useEffect(() => {
    fetchCategories();
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
  
    <div className="managecategory-page">
      <h1>Manage Categories</h1>

      {/* Add/Update Category Form */}
      <div className="managecategory-form">
        <h2>{isEditing ? 'Update Category' : 'Add New Category'}</h2>
        <form onSubmit={onSubmit}>
          <label>
            Category Name :
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
            />
          </label>
          <label>
            Image :
            <input
              type="file"
              name="image"
              onChange={onImageChange}
              required={!isEditing} // Only required if adding a new category
            />
          </label>
          <label>
            Description :
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              rows="4"
              required
            />
          </label>
          <button type="submitcat" className="submitcat-btn">
            {isEditing ? 'Update Category' : 'Add Category'}
          </button>
        </form>
      </div>

      {/* Category List */}
      <div className="mcategory-list">
        <h2>Categories</h2>

        {categories.length > 0 ? (
          <ul>
            {categories.map((category) => (
              <li key={category._id} className="category-item">
                <div className="category-info">
                  <img src={`http://localhost:5000/uploads/${category.image}`} alt={category.name} className="category-image" />
                  <div>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                  </div>
                </div>
                <div className="category-actions">
                  <button className="btnedit" onClick={() => onEdit(category)}>Update</button>
                  <button className="btndelete" onClick={() => onDelete(category._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories available</p>
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

export default CategoryPage;
