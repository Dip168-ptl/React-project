import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import navicon from '../../Assets/navicon.png'; // Adjust path as needed
import Footera from './Footera.js';
import './addrestaurant.css'; // Assuming you will style it with a CSS file
import axios from 'axios';

// import r1 from '../../Assets/r1.png';

const AddRestaurant = () => {
    const [showGoUpButton, setShowGoUpButton] = useState(false); // Define showGoUpButton state
    const [activeMenu, setActiveMenu] = useState('Restaurant');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [message, setMessage] = useState(''); // To display messages
    const [restaurantData, setRestaurantData] = useState({
      name: '',
      address: '',
      contact: '',
      openingHours: '',
      logo: null,
      status: 'open'
    });
  
    useEffect(() => {
        const fetchRestaurants = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/restaurants');
            console.log('Fetched restaurants:', response.data); // Add this to debug
            setRestaurants(response.data);
          } catch (error) {
            console.error('Error while fetching restaurants:', error);
            setMessage('Error fetching restaurants.');
          }
        };
    
        fetchRestaurants();
    }, []);


    // Fetch managers on component mount
    // useEffect(() => {
    //   fetchManagers();
    // }, []);
  
    // const fetchManagers = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:5000/api/managers'); // Assuming /api/managers is the route
    //     setManagers(response.data);  // Set the list of managers
    //   } catch (error) {
    //     console.error('Error fetching managers:', error);
    //   }
    // };
  
    // Handle form input changes
    const handleChange = (e) => {
      setRestaurantData({
        ...restaurantData,
        [e.target.name]: e.target.value
      });
    };
  
    // Handle file input (logo upload)
    const handleFileChange = (e) => {
      setRestaurantData({
        ...restaurantData,
        logo: e.target.files[0]  // Save the file object in state
      });
    };
  
    // Handle form submission (file needs special handling for form-data)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', restaurantData.name);
        // formData.append('managerId', restaurantData.managerId);
        formData.append('address', restaurantData.address);
        formData.append('contact', restaurantData.contact);
        formData.append('openingHours', restaurantData.openingHours);
        formData.append('status', restaurantData.status);
        if (restaurantData.logo) {
          formData.append('logo', restaurantData.logo);
        }
    
        try {
          await axios.post('http://localhost:5000/api/restaurants', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setMessage('Restaurant added successfully!');  // Show success message
        resetForm();  // Reset the form
        fetchUpdatedRestaurants();  // Fetch and display updated restaurant list
        } catch (error) {
          console.error('Error adding restaurant:', error);
          setMessage('Error adding restaurant.'); 
        }
      };


useEffect(() => {
    // You can fetch real restaurant data from an API here
    // Example: fetchRestaurantData();
}, []);

const resetForm = () => {
  setRestaurantData({
    name: '',
    address: '',
    contact: '',
    openingHours: '',
    logo: null,
    status: 'open'
  });
};

const fetchUpdatedRestaurants = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/restaurants');
    setRestaurants(response.data);  // Update restaurant list after adding
  } catch (error) {
    console.error('Error fetching updated restaurants:', error);
  }
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
        <div className="addrest">
            <h1>Manage Restaurant</h1>
          <div className="addrestaurant">
            <form onSubmit={handleSubmit}>
            <h2>Restaurant</h2>
            <label htmlFor="name">Restaurant Name : </label>
            <input
            type="text"
            name="name"
            value={restaurantData.name}
            onChange={handleChange}
            required
            />
            {/* <label htmlFor="managerId">Manager : </label>
            <select
            name="managerId"
            value={restaurantData.managerId}
            onChange={handleChange}
            required
            >
            <option value="">Select Manager</option>
            {managers.map(manager => (
                <option key={manager._id} value={manager._id}>
                {manager.name}
                </option>
            ))}
            </select> */}
            <label htmlFor="address">Address : </label>
            <textarea
              name="address"
              value={restaurantData.address}
              onChange={handleChange}
              rows="4"
              required
            />
            <label htmlFor="contact">Contact : </label>
            <input
            type="text"
            name="contact"
            value={restaurantData.contact}
            onChange={handleChange}
            required
            />
            <label htmlFor="openingHours">Opening Hours : </label>
            <select
            name="openingHours"
            value={restaurantData.openingHours}
            onChange={handleChange}
            required
            >
            <option value="">Select Opening Hours</option>
            <option value="9:00 AM - 6:30 PM">9:00 AM - 6:30 PM</option>
            <option value="10:00 AM - 8:00 PM">10:00 AM - 8:00 PM</option>
            <option value="12:00 PM - 10:00 PM">12:00 PM - 10:00 PM</option>
            <option value="7:00 AM - 3:00 PM">7:00 AM - 3:00 PM</option>
            </select>
            <label htmlFor="logo">Logo : </label>
            <input
            type="file"
            name="logo"
            onChange={handleFileChange}  // Handle file input
            />
            <label htmlFor="status">Status : </label>
            <select
            name="status"
            value={restaurantData.status}
            onChange={handleChange}
            >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            </select>
            <button type="submitrest" className="submitrestaurant"> Add Restaurant</button>
            </form>
        </div>
      </div>
        <div className="restdisplay">
        <h2>Restaurant</h2>
        {/* {restaurants.length > 0 ? (
        <ul>
            {restaurants.map((restaurant) => (
            <li key={restaurant._id}>
                <h3>{restaurant.name}</h3>
                {/* <p>Manager: {restaurant.managerId.name}</p> 
                <p>Address: {restaurant.address}</p>
                <p>Contact: {restaurant.contact}</p>
                <p>Opening Hours: {restaurant.openingHours}</p>
                <p>Status: {restaurant.status}</p>
                {restaurant.logo && <img src={`http://localhost:5000/uploads/logos/${restaurant.logo}`} alt={restaurant.name} />}
            </li>
            ))}
        </ul>
        ) : (
          <p>No restaurant available</p>
        )} */}
        {restaurants.length > 0 ? (
          <table className="restaurant-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Opening Hours</th>
                <th>Status</th>
                <th>Logo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant._id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.address}</td>
                  <td>{restaurant.contact}</td>
                  <td>{restaurant.openingHours}</td>
                  <td>{restaurant.status}</td>
                  <td>
                    {restaurant.logo ? (
                      <img
                        src={`http://localhost:5000/uploads/logos/${restaurant.logo}`}
                        alt={restaurant.name}
                        width="50"
                        height="50"
                      />
                    ) : (
                      'No logo'
                    )}
                  </td>
                  <td>
                    <button
                      className="viewrest-btn"
                      onClick={() => navigate(`/restaurant/101`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No restaurant available</p>
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

)};

export default AddRestaurant;
