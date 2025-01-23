import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
// import Footera from './Footera.js';
import axios from 'axios';
import  './profile.css';
import defaultProfilePicture from '../Assets/ilogo.jpg'; // Default avatar image
import navicon from '../Assets/navicon.png'; // Import the logo
// import foodImage1 from '../Assets/i1.jpg'; // Add your own images
// import foodImage2 from '../Assets/i2.jpg';
// import foodImage3 from '../Assets/i3.jpg';


const ProfilePage = ({ userId }) => {
    const [showGoUpButton, setShowGoUpButton] = useState(false); 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('Profile');

  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth(); // Use currentUser from AuthContext


  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (menu === 'Dashboard') {
      navigate('/managerdash'); // Redirect to the dashboard page
    }
    // Add more conditions for other menu items if needed
  };

// Scroll to top function
const scrollToTop = () => {  
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

useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
        document.removeEventListener('click', handleOutsideClick);
    };
}, []);

// Simulating fetching the user data from AuthContext or API
useEffect(() => {
    // Assuming currentUser has user data including profilePicture
    if (currentUser) {
        setUser({
            name: currentUser.name,
            email: currentUser.email,
            profilePicture: currentUser.profilePicture || defaultProfilePicture, // Use default if not set
        });
    }
}, [currentUser]);

const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/'); // Redirect to the home page or login page
};

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setUser(response.data);
        setPreview(`http://localhost:5000/uploads/profile/${response.data.image}`);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('address', user.address);
    formData.append('contact', user.contact);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/updateProfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // If successful, show a message and reset the form
    if (response.data.success) {
        setMessage('Profile updated successfully!');
        setUser({
          name: '',
          email: '',
          address: '',
          contact: '',
          profilePicture: '',
        });
        setImage(null);
        setPreview('');
      } else {
        setMessage(response.data.message || 'Error updating profile. Please try again.');
      }
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
    }
  };

return (

    <div className="cust-dashboard">
        <nav className="navbar">
            <div className="navbar-left">
                <img src={navicon} alt="nav Icon" width="60" height="60" className="navbar-icon" />
                <div className="name"> Go Fresh </div>
            </div>
            <ul className="navbar-menu">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/category">Category</Link></li>
                <li><Link to="/contactus">Contact us</Link></li>
                <li><Link to="/aboutus">About us</Link></li>
            </ul>
                <div className="navbar-right1">
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." className="search-input" />
                    </div>
                    <i className="fas fa-shopping-cart cart-icon"></i>

                    {/* Display user profile picture instead of user icon */}
                    {/* <img
                        src={user?.profilePicture || defaultProfilePicture} 
                        alt="Profile" 
                        className="profile-picture" 
                        onClick={toggleDropdown}
                        ref={dropdownRef}
                    /> */}

                    {/* Dropdown for user menu */}
                    {/* {isDropdownOpen && (
                    <div className="user-menu">
                        <ul>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/Profile">Profile</Link></li>
                            <li><Link to="/saved-addresses">Saved Addresses</Link></li>
                            <li><Link to="/account-details">Account Details</Link></li>
                            <li><Link to="/favorites">Favorites</Link></li>
                            <li><Link to="/quick-actions">Quick Actions</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>}
                        </ul>
                    </div> 
                )}*/}
            </div>
        </nav>

        {/* <div className="dashboard-content">
            <h1>Welcome, {user?.name || 'Customer'}!</h1> 
        </div> */}

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

        <div className="profile-page">
            <h2>Update Profile</h2>
            {preview && <img src={preview} alt="Profile Preview" style={{ width: '150px', borderRadius: '50%' }} />}
            <form onSubmit={handleSubmit}>
                <label>
                Name:
                <input type="text" name="name" value={user.name || ''} onChange={handleInputChange} required />
                </label>
                <br />
                <label>
                Email:
                <input type="email" name="email" value={user.email || ''} onChange={handleInputChange} required />
                </label>
                <br />
                <label>
                Address:
                <input type="text" name="address" value={user.address || ''} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                Contact Number:
                <input type="text" name="contact" value={user.contact || ''} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                Profile Picture:
                <input type="file" accept="image/*" onChange={handleFileChange} />
                </label>
                <br />
                <button type="submit">Update Profile</button>
            </form>
            {/* {message && <p>{message}</p>} */}
        </div>
        {/* <Footera /> */}

        {/* "Go Upward" Button */}
        {showGoUpButton && (
            <button className="go-up-button" onClick={scrollToTop}>
                ↑ 
            </button>
        )}
    </div>
    );
};
export default ProfilePage;
