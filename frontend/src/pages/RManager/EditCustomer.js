import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import navicon from '../../Assets/navicon.png'; // Adjust path as needed
import './addcustomer.css';

import Footera from './Footera.js';

const EditCustomer = () => {
  const [showGoUpButton, setShowGoUpButton] = useState(false); // Define showGoUpButton state
  const [activeMenu, setActiveMenu] = useState('Customers');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(); // New state for submenus
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

//   const [customer, setCustomer] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     pincode: ''
// });

// const handleChange = (e) => {
//   console.log("Input changed:", e.target.name, e.target.value); // Debugging input changes
//     const { name, value } = e.target;
//     setCustomer({
//         ...customer,
//         [name]: value
//     });
// };

    // State to hold customer details
    const [customer, setCustomer] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      pincode: ''
  });

  // Function to handle input changes and update state
  const handleChange = (e) => {
      const { name, value } = e.target;
      setCustomer({
          ...customer,
          [name]: value
      });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Customer data:', customer);
      alert('Customer added successfully!');
      // Clear the form after submission
      setCustomer({
          name: '',
          email: '',
          phone: '',
          address: '',
          pincode: ''
      });
    }
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
    }
    // Add more conditions for other menu items if needed
  };

  const handleSubMenuClick = (submenu) => {
    setActiveSubMenu(submenu);
    // Add navigation or other actions based on submenu
    if (submenu === 'Order List') {
      navigate('/OrderList');
    } else if (submenu === 'Order Details') {
      navigate('/OrderDetails');
    }
    // Add more conditions for other submenus if needed
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
            <button onClick={() => handleMenuClick('Customers')}>Customers</button>
            {activeMenu === 'Customers' && (
              <div className="submenu">
              <button onClick={() => navigate("/CustomerList")}>Customer List</button>
              <button onClick={() => navigate("/AddCustomer")}>Add Customer</button>
              <button onClick={() => navigate("/EditCustomer")}>Edit Customer</button>
            </div>
            )}
          </li>
          <li className={activeMenu === 'Restaurants' ? 'active' : ''}>
            <button onClick={() => handleMenuClick('Restaurants')}>Restaurants</button>
            {activeMenu === 'Restaurants' && (
              <div className="submenu">
               <button onClick={() => navigate("/RestaurantList")}>Restaurant List</button>
                <button onClick={() => navigate("/AddRestaurant")}>AddRestaurant</button>
                <button onClick={() => navigate("/EditRestaurant")}>EditRestaurant</button>
            </div>
            )}
          </li>
          <li className={activeMenu === 'Dishes' ? 'active' : ''}>
            <button onClick={() => handleMenuClick('Dishes')}>Dishes</button>
            {activeMenu === 'Dishes' && (
              <div className="submenu">
              <button
                className={activeSubMenu === 'Dish List' ? 'active' : ''}
                onClick={() => handleSubMenuClick('Dish', 'Dish List')}
              >
                Dish List
              </button>
              <button
                className={activeSubMenu === 'Add Dish' ? 'active' : ''}
                onClick={() => handleSubMenuClick('Dish', 'Add Dish')}
              >
                Add Dish
              </button>
              <button
                className={activeSubMenu === 'Edit Dish' ? 'active' : ''}
                onClick={() => handleSubMenuClick('Dish','Edit Dish')}
              >
                Edit Dish
              </button>
            </div>
            )}
          </li>
          <li className={activeMenu === 'Sellers' ? 'active' : ''}>
            <button onClick={() => handleMenuClick('Sellers')}>Sellers</button>
            {activeMenu === 'Sellers' && (
              <div className="submenu">
              <button
                className={activeSubMenu === 'seller List' ? 'active' : ''}
                onClick={() => handleSubMenuClick('seller', 'seller List')}
              >
                seller List
              </button>
              <button
                className={activeSubMenu === 'Add seller' ? 'active' : ''}
                onClick={() => handleSubMenuClick('seller', 'Add seller')}
              >
                Add seller
              </button>
              <button
                className={activeSubMenu === 'Edit seller' ? 'active' : ''}
                onClick={() => handleSubMenuClick('seller','Edit seller')}
              >
                Edit seller
              </button>
            </div>
            )}
          </li>
          <li className={activeMenu === 'Profile' ? 'active' : ''}>
          <button onClick={() => navigate("/Profile")}>Profile</button>
          </li>
          <li>
            <button className="logout-btn">Logout</button>
          </li>
        </ul>
      </div>
      
      <div className="add-customer-container">
            <h2>Edit Customer</h2>
            <form onSubmit={handleSubmit} className="form-grid">
                <div className="form-item">
                <label> Name : </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={customer.name}
                        onChange={handleChange}
                        placeholder=" Enter the name" 
                        required
                    />
                </div>
                <div className="form-item">
                <label> Email : </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        placeholder=" Enter the email" 
                        required
                    />
                </div>
                <div className="form-item">
                <label> Phone : </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={customer.phone}
                        onChange={handleChange}
                        placeholder=" Enter the phone number" 
                        required
                    />
                </div>
                <div className="form-item">
                <label> Pincode : </label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={customer.pincode}
                        onChange={handleChange}
                        placeholder=" Enter the pincode" 
                        required
                    />
                </div>
                <div className="form-item">
                <label> Address : </label>
                <div className="input1">
                <textarea id="textarea" name="adress" rows="8" cols="150" placeholder="Enter Address" />
                </div>
                </div>

                <div className="form-item full-width">
                <div className="button-container">
                <button type="clear" className="clear-btn"> Clear </button>
                <button type="submitc" className="submitc-btnc"> Save </button>
                </div>
                </div>
            </form>
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

export default EditCustomer;
