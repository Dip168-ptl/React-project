import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import navicon from '../../Assets/navicon.png'; // Adjust path as needed
import './OrderDetails.css'; // Import the CSS file
import Footera from './Footera.js';
import { useParams } from "react-router-dom";


const OrderDetails = ({ match }) => {
  // const orderId = match.params.id; // Get the order ID from the URL
  const [showGoUpButton, setShowGoUpButton] = useState(false); // Define showGoUpButton state
  const [activeMenu, setActiveMenu] = useState('Orders');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { orderId } = useParams(); // Access the route parameter

  // const handleOrderClick = () => {
  //   navigate(`/OrderDetails/1002`); // Redirects to the OrderDetails page with orderId 1002
  // }

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

const handleMenuClick = (menu) => {
  setActiveMenu(menu);
  if (menu === 'Dashboard') {
    navigate('/managerdash'); // Redirect to the dashboard page
  }
  // Add more conditions for other menu items if needed
};

  // Function to handle menu click
  // const handleMenuClick = (menu) => {
  //   setActiveMenu(menu);
  //   setActiveSubMenu(null); // Reset submenus when changing the main menu
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
    navigate('/login'); // Redirect to home or login page after logout
  };  

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // Example order details data
  const order = {
    id: orderId,
    date: '2024-09-01',
    items: [
      { name: 'Pizza', quantity: 2, price: '$20.00' },
      { name: 'Burger', quantity: 1, price: '$10.00' },
      { name: 'Pasta', quantity: 1, price: '$15.00' },
    ],
    totalAmount: '$45.00',
    status: 'Delivered',
  };

    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order.id}</p>
      <p>Date: {order.date}</p>
      <h3>Items:</h3>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.name} - Quantity: {item.quantity} - Price: {item.price}
          </li>
        ))}
      </ul>
      <p>Total Amount: {order.totalAmount}</p>
      <p>Status: {order.status}</p>
    </div>

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
    <div className="order-details-container">
      <h11>Order Details - {order.id}</h11>
      <p1><strong>Date:</strong> {order.date}</p1>
      <p1><strong>Status:</strong> {order.status}</p1>
      <br></br>
      <h12>Items Ordered</h12>
      <table className="items-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h13><strong>Total Amount:</strong> {order.totalAmount}</h13>
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

export default OrderDetails;
