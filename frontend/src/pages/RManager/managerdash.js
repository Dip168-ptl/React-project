import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import navicon from '../../Assets/navicon.png'; // Adjust path as needed
import './managerdash.css';

import Footera from './Footera.js';
import img1 from '../../Assets/b1.png';
import img2 from '../../Assets/f1.png';
import img3 from '../../Assets/p1.png';
import img4 from '../../Assets/s1.png';
import img5 from '../../Assets/roll.png';
import img6 from '../../Assets/n1.png';

import img7 from '../../Assets/p2.png';
import img8 from '../../Assets/vegs.png';
import img9 from '../../Assets/vegn.png';
import img10 from '../../Assets/paneerf.png';
import img11 from '../../Assets/cheeseb.png';





const RestaurantManager = () => {
  const [showGoUpButton, setShowGoUpButton] = useState(false); // Define showGoUpButton state
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();



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
  };

  // const handleSubMenuClick = (submenu) => {
  //   setActiveSubMenu(submenu);
  //   // Add navigation or other actions based on submenu
  //   if (submenu === 'Order List') {
  //     navigate('/OrderList');
  //   } else if (submenu === 'Order Details') {
  //     navigate('/OrderDetails');
  //   }
  //   // Add more conditions for other submenus if needed
  // };

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
      navigate('/Home'); // Redirect to home or login page after logout
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
       
      {/* Main Content Area */}
      <div className="contentdash">
        {activeMenu === 'Dashboard' && (
          <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="dashboard-grid">
              <div className="dashboard-container">
                <h3>Total Revenue</h3>
                <p>25,000</p>
              </div>
              <div className="dashboard-container">
                <h3>New Orders</h3>
                <p>12</p>
              </div>
              <div className="dashboard-container">
                <h3>Received Orders</h3>
                <p>30</p>
              </div>
              <div className="dashboard-container">
                <h3>Reviews</h3>
                <p>47</p>
              </div>
              <div className="dashboard-container">
                <h3>Successful Orders</h3>
                <p>54</p>
              </div>
            </div>
      <div className="category-section">
      <div className="category-headercat">
        <h21>Categories</h21>
        <Link to="/Rcategory" className="view-all-link">View All </Link>
      </div>
      <div className="category-grid">
        <div className="category-item">
          <img src={img1} alt="" width="60" height="60" className="category-image" />
          <h3> Burger </h3>
        </div>
        <div className="category-item">
          <img src={img2} alt="" width="60" height="60" className="category-image" />
          <h3> Frankie </h3>
        </div>
        <div className="category-item">
          <img src={img3} alt="" width="60" height="60" className="category-image" />
          <h3> Pizza </h3>
        </div>
        <div className="category-item">
          <img src={img4} alt="" width="60" height="60" className="category-image" />
          <h3> Sandwhich </h3>
        </div>
        <div className="category-item">
          <img src={img5} alt="" width="60" height="60" className="category-image" />
          <h3> Spring roll </h3>
        </div>
        <div className="category-item">
          <img src={img6} alt="" width="60" height="60" className="category-image" />
          <h3> Noodels </h3>
        </div>
      </div>
    </div>
    
      <div className="best-selling-section">
        <div className="best-selling-headercat">
          <h22>Best Selling Products</h22>
          <Link to="/Rcategory" className="view-all-link">View All</Link>
        </div>
        <div className="best-selling-grid">
          <div className="product-item">
            <img src={img7} alt="" className="product-image" />
            <h3> 7 cheesse pizza </h3>
            <p className="product-price"> ₹200.00 </p>
          </div>
          <div className="product-item">
            <img src={img8} alt="" className="product-image" />
            <h3> veg spring roll </h3>
            <p className="product-price"> ₹140.00 </p>
          </div>
          <div className="product-item">
            <img src={img9} alt="" className="product-image" />
            <h3> veg Noodels </h3>
            <p className="product-price"> ₹240.00 </p>
          </div>
          <div className="product-item">
            <img src={img10} alt="" className="product-image" />
            <h3> Paneer Frankie </h3>
            <p className="product-price"> ₹15.00 </p>
          </div>
          <div className="product-item">
            <img src={img11} alt="" className="product-image" />
            <h3> veg Cheese burger </h3>
            <p className="product-price"> ₹15.00 </p>
          </div>

        </div>
      </div>
        </div>
        )}

      
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

export default RestaurantManager;
