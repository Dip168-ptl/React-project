import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Customerdash.css'; // Ensure styles are included
import navicon from '../Assets/navicon.png'; // Import the logo
import foodImage1 from '../Assets/i1.jpg'; // Add your own images
import foodImage2 from '../Assets/i2.jpg';
import foodImage3 from '../Assets/i3.jpg';
import Footer from './Footer';
import defaultProfilePicture from '../Assets/ilogo.jpg'; // Default avatar image

const Customerdash = () => {
    const [showGoUpButton, setShowGoUpButton] = useState(false); 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState(null); // State to store user data
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { logout, currentUser } = useAuth(); // Use currentUser from AuthContext

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
                    <img
                        src={user?.profilePicture || defaultProfilePicture} 
                        alt="Profile" 
                        className="profile-picture" 
                        onClick={toggleDropdown}
                        ref={dropdownRef}
                    />

                    {/* Dropdown for user menu */}
                    {isDropdownOpen && (
                        <div className="user-menu">
                            <ul>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                {/* <li><Link to="/Profile">Profile</Link></li> */}
                                <li><Link to="/saved-addresses">Saved Addresses</Link></li>
                                <li><Link to="/account-details">Account Details</Link></li>
                                <li><Link to="/favorites">Favorites</Link></li>
                                <li><Link to="/quick-actions">Quick Actions</Link></li>
                                <li><button onClick={handleLogout}>Logout</button></li> {/* Logout button */}
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            <div className="dashboard-content">
                <h1>Welcome, {user?.name || 'Customer'}!</h1> {/* Display customer name */}

                <div className="food-items">
                    <div className="food-item">
                        <img src={foodImage1} alt="Food Item 1" />
                        <h3>Delicious Pizza</h3>
                        <p>A classic pizza with a blend of cheese and tomato sauce.</p>
                        <button className="action-btn">Add to Cart</button>
                        <button className="action-btn">Buy Now</button>
                    </div>

                    <div className="food-item">
                        <img src={foodImage2} alt="Food Item 2" />
                        <h3>Fresh Sushi</h3>
                        <p>Freshly made sushi rolls with a variety of fillings.</p>
                        <button className="action-btn">Add to Cart</button>
                        <button className="action-btn">Buy Now</button>
                    </div>

                    <div className="food-item">
                        <img src={foodImage3} alt="Food Item 3" />
                        <h3>Tasty Burger</h3>
                        <p>Juicy burger with all your favorite toppings.</p>
                        <button className="action-btn">Add to Cart</button>
                        <button className="action-btn">Buy Now</button>
                    </div>
                </div>
            </div>

            <Footer />

            {/* "Go Upward" Button */}
            {showGoUpButton && (
                <button className="go-up-button" onClick={scrollToTop}>
                    ↑ 
                </button>
            )}
        </div>
    );
};

export default Customerdash;
