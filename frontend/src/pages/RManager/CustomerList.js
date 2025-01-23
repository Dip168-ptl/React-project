import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import navicon from '../../Assets/navicon.png'; // Adjust path as needed
import './customerlist.css'; // Import the CSS file
import Footera from './Footera.js';
import axios from 'axios'; // Import axios for API calls


const CustomerList = () => {
  const [showGoUpButton, setShowGoUpButton] = useState(false); // Define showGoUpButton state
  const [customers, setCustomers] = useState([]);
  const [activeMenu, setActiveMenu] = useState('Customers');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  // const customers = [
  //   { id: 1, name: 'John Doe', email: 'john@example.com', contact: '123-456-7890' },
  //   { id: 2, name: 'Jane Smith', email: 'jane@example.com', contact: '987-654-3210' },
  //   { id: 3, name: 'Alice Johnson', email: 'alice@example.com', contact: '456-789-0123' },
  //   // Add more customers as needed
  // ];

  useEffect(() => {
    // Fetch customer data from the backend
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers'); // Replace with your API endpoint
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

    const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (menu === 'Dashboard') {
      navigate('/managerdash'); // Redirect to the dashboard page
    }
    // Add more conditions for other menu items if needed
  };

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
              <p className="user-name">Raj Mehta</p> {/* User Name and Role */}
              <p className="username">Manager</p>

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
    
      <div className="customer-list">
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
        {customers.map((customer, index) => (
              <tr key={customer._id || index}>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default CustomerList;
