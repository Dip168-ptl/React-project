import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import navicon from '../../Assets/navicon.png'; // Adjust path as needed
import './OrderList.css'; // Import the CSS file
import Footera from './Footera.js';


const OrderList = () => {
  const [showGoUpButton, setShowGoUpButton] = useState(false); // Define showGoUpButton state
  const [activeMenu, setActiveMenu] = useState('Orders');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  
  // const handleOrderClick = () => {
  //   navigate(`/OrderDetails/1002`); // Redirects to the OrderDetails page with orderId 1002
  // }
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



  const orders = [
    { id: '#1001', date: '2024-09-01', amount: '$45.00', status: 'Delivered' },
    { id: '#1002', date: '2024-09-02', amount: '$30.00', status: 'Processing' },
    { id: '#1003', date: '2024-09-03', amount: '$55.00', status: 'Pending' },
    // Add more orders as needed
  ];

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
    
    <div className="order-list-container">
      <h11>Order List</h11>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
              <td>
                <a href={`/order-details/${order.id}`} className="view-details">
                  View Details
                </a>
              </td>
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

export default OrderList;
