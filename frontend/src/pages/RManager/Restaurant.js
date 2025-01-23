import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import navicon from '../../Assets/navicon.png'; // Adjust path as needed
import Footera from './Footera.js';
import './restaurant.css'; // Assuming you will style it with a CSS file

import r1 from '../../Assets/r1.png';

const Restaurant = () => {
    const [showGoUpButton, setShowGoUpButton] = useState(false); // Define showGoUpButton state
    const [activeMenu, setActiveMenu] = useState('Restaurant');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
  
// Dummy restaurant data
const [restaurants, setRestaurants] = useState([
    {
        id: 1,
        name: " Food King ",
        location: "Bardoli",
        rating: 4.5,
    }
    // {
    //     id: 2,
    //     name: "Green Garden",
    //     location: "Los Angeles",
    //     rating: 4.7,
    // },
    // {
    //     id: 3,
    //     name: "Urban Bites",
    //     location: "Chicago",
    //     rating: 4.3,
    // },
    // {
    //     id: 4,
    //     name: "Bistro Delight",
    //     location: "San Francisco",
    //     rating: 4.6,
    // }
]);

useEffect(() => {
    // You can fetch real restaurant data from an API here
    // Example: fetchRestaurantData();
}, []);
  
  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // You can add the logic to send customer data to the backend here.
  //     // console.log('Customer data:', customer);
  //     alert('Customer added successfully!');
  // };    
  
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
      } else if (menu === 'Restaurant') {
        navigate('/Restaurant'); 
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
                <p className="user-name">John Doe</p> {/* User Name and Role */}
                <p className="username">admin</p>
  
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                    <button className="logout-btn">Logout</button>
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
            <li className={activeMenu === 'AddRestaurant' ? 'active' : ''}>
              <button onClick={() => navigate("/AddRestaurant")}>AddRestaurant</button>
            </li>
            <li className={activeMenu === 'Profile' ? 'active' : ''}>
              <button onClick={() => navigate("/Profile")}>Profile</button>
            </li>
            <li>
            <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
        
        <div className="restaurant-list-container">
            <h2>Restaurant List</h2>
            <div className="restaurant-list">
                {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className="restaurant-card">
                      <img src={r1} alt="" width="90" height="90"/>
                        <h3>{restaurant.name}</h3>
                        <p><strong>Location:</strong> {restaurant.location}</p>
                        <p><strong>Rating:</strong> {restaurant.rating} / 5</p>
                        <button className="view-details-button">View Details</button>
                    </div>
                ))}
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

)};

export default Restaurant;
