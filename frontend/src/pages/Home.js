import React, { useState, useEffect } from 'react';
import { Link  } from 'react-router-dom';
import Footer from './Footer';
import './Home.css';
import axios from 'axios';

import navicon from '../Assets/navicon.png';
import ff from '../Assets/fastfood.png';
import tf from '../Assets/testy.png';
import fd from '../Assets/delivery.png';
import burger from '../Assets/b1.jpg';

// Import images for the slider
import image5 from '../Assets/n3.jpg'; 
import image6 from '../Assets/i44.jpg.jpg';
import image7 from '../Assets/a2.jpg';
import image8 from '../Assets/s8.jpg';
import image9 from '../Assets/f5.jpg';

// Import images for the page content
import image1 from '../Assets/i18.jpg';
import image2 from '../Assets/i19.jpg';
// import image3 from '../Assets/i20.jpeg';
// import image4 from '../Assets/i22.jpg';


const sliderImages = [
  { images: image5, text: "Order Now Your Favourite Food" },
  { images: image6, text: "Fresh Ingredients & Tasty Meals" },
  { images: image7, text: "Fast and Reliable Service" },
  { images: image9, text: "Delicious Food Delivered to You" },
  { images: image8, text: "Enjoy Your food" }
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGoUpButton, setShowGoUpButton] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [items, setItems] = useState([]);


  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchCategoryItems();
      setCategories(data);
    };
    loadItems();
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const goToPreviousSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const fetchCategoryItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items'); // Replace with your API endpoint
      const data = await response.json();
       // Limit to 5 items per category
      //  const limitedData = data.map((category) => ({
      //   ...category,
      //   items: category.items.slice(0, 5),
      // }));

      // return limitedData;
    } catch (error) {
      console.error('Error fetching category items:', error);
      return [];
    }
  };

  
  // Add to Cart
  const handleAddToCart = (item) => {
    alert(`${item.name} added to cart!`);
  };

  // Order Now
  const handleOrderNow = (item) => {
    alert(`Order placed for ${item.name}!`);
  };


  return (
    <div className="home">
      <nav className="navbarhome">
        <div className="navbar-lefth">
          <i className="logo"></i>
          <img src={navicon} alt="nav Icon" width="60" height="60" className="navbar-icon" />
          <div className="name"> Go Fresh </div>
        </div>
        <ul className="navbar-menuh">
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/category">Category</Link></li>
          <li><Link to="/contactus">Contact us</Link></li>
          <li><Link to="/aboutus">About us</Link></li>
          {/* <li><Link to="/Manageitem">Manageitem</Link></li> */}
          {/* <li><Link to="/Adminpage">AdminPage</Link></li> */}
          {/* <li><Link to="/Profile">Profile</Link></li> */}
          {isLoggedIn && <li><Link to="/Customerdash">Dashboard</Link></li>} {/* Show dashboard link when logged in
          
          <li><Link to="/managerdash">RestaurantManager</Link></li> */}
        </ul>
        <div className="navbar-righth">
          <i className="fas fa-shopping-cart cart-icon"></i>
          <div className="search-barh">
            <input type="text" placeholder="Search..." className="search-input" />
            <Link to="/login" className="login-btn">Login</Link>

            
            {/* <Link to="/login" className={`login-btn ${isLoggedIn ? 'disabled' : 'true'}`} 
              onClick={isLoggedIn ? (e) => e.preventDefault() : null}
            >
              Login
            </Link> */}
          </div>
        </div>
      </nav>

      {/* Image Slider */}
      <div className="slider">
        {sliderImages.map((images, index) => (
          <div
            key={index}
            className={`slide ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${images.images})` }}
          >
            <div className="slide-text">
              {images.text}
            </div>
          </div>
        ))}

        <button className="slider-button prev" onClick={goToPreviousSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="slider-button next" onClick={goToNextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button> 
      </div>

      <div className="services-container">
        <div className="service-container">
          <div className="service-box">
            <img src={ff} alt="fast food" width="80" height="80" />
            <h3>Fast Foods</h3>
            <p>Enjoy a wide variety of fast foods that are delicious and tasty.</p>
          </div>
          <div className="service-box">
            <img src={tf} alt="tasty food" width="80" height="80" />
            <h3>Tasty Foods</h3>
            <p>Looking for something tasty? Try our tasty food.</p>
          </div>
          <div className="service-box">
            <img src={fd} alt="fast delivery" width="80" height="80" />
            <h3>Fast Delivery</h3>
            <p>We ensure that your food reaches you quickly and safely with our fast delivery service.</p>
          </div>
        </div>
      </div>

      {/* Food Items */}
      <div className="fooditem">
        <h1>Our Food Items</h1>
        {/* <div className="item">
            <img src={burger} alt="Pizza" />
            <h2>Pizza</h2>
            <p>Price: ₹350</p>
            <button onClick={() => alert('Ordering Pizza!')}>Order Now</button>
            <buttonA onClick={() => alert('Pizza has been added to your cart!')}>Add to Cart</buttonA>
            </div>
            <div className="item">
            <img src={burger} alt="Thepla"  />
            <h2>Thepla</h2>
            <p>Price: ₹90</p>
            <button onClick={() => alert('Ordering Thepla!')}>Order Now</button>
            <buttonA onClick={() => alert('Thepla has been added to your cart!')}>Add to Cart</buttonA>
          </div>   
          <div className="item">     
            <img src={burger} alt="Pasta"  />
            <h2> white sauce Pasta</h2>
            <p>Price: ₹230</p>
            <button onClick={() => alert('Ordering Pasta!')}>Order Now</button>
            <buttonA onClick={() => alert('Pasta has been added to your cart!')}>Add to Cart</buttonA>
          </div>
          <div className="item">
            <img src={burger} alt="Frenkie"  />
            <h2>Frenkie</h2>
            <p>Price: ₹150</p>
            <button onClick={() => alert('Ordering Frenkie!')}>Order Now</button>
            <buttonA onClick={() => alert('Frenkie has been added to your cart!')}>Add to Cart</buttonA>
          </div>
          <div className="item">
            <img src={burger} alt="Dal-Rice"   />
            <h2>Dal-Rice</h2>
            <p>Price: ₹190</p>
            <button onClick={() => alert('Ordering Dal-Rice!')}>Order Now</button>
            <buttonA onClick={() => alert('Dal-Rice has been added to your cart!')}>Add to Cart</buttonA>
          </div> */}

          {categories.map((category) => (
          <div key={category.category} className="category-section">
            <h2>{category.category}</h2>
            <div className="items-container">
              {category.items.map((item) => (
                <div key={item.id} className="item">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <button onClick={() => alert(`Ordering ${item.name}`)}>Order Now</button>
                <button onClick={() => alert(`${item.name} added to cart`)}>Add to Cart</button>
              </div>
              ))}
            </div>
          </div>
      ))}
<div className="items-section">
          <h2>Items  </h2>
          {/* <h2>Items in {categories.find((cat) => cat._id === selectedCategory)?.name}</h2> */}

          {loading ? (
            <p>Loading items...</p>
          ) : errorMessage ? (
            <p style={{ color: 'red' }}>{errorMessage}</p>
          ) : items.length > 0 ? (
            <div className="items-grid">
              {items.map((item) => (
                <div key={item._id} className="item-card">
                  <img
                    src={`http://localhost:5000/uploads/imagelist/${item.image}`}
                    alt={item.name}
                    className="item-image"
                  />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: ₹{item.price}</p>
                  <p>Preparation Time: {item.preparationTime} mins</p>
                  <div className="cat-actions">
                    <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    <button onClick={() => handleOrderNow(item)}>Order Now</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No items available </p>
          )}
        </div>

      </div>

      {/* Content Sections */}
      <div className="main-container more-than-half" style={{ backgroundImage: `url(${image1})` }}>
        <section className="section-content">
          <h2>Our Delicious Food</h2>
          <p>We offer a wide variety of mouth-watering dishes that are sure to satisfy your cravings. Explore our menu and discover new flavors!</p>
        </section>
      </div>
      <div className="main-container half" style={{ backgroundImage: `url(${image2})` }}>
        <section className="section-content">
          <h2>Fast and Reliable Delivery</h2>
          <p>Our delivery service is fast, reliable, and always on time. We ensure that your food arrives fresh and hot, straight to your door.</p>
        </section>
      </div>
      {/* <div className="main-container quarter" style={{ backgroundImage: `url(${image3})` }}>
        <section className="section-content">
          <h2>Fresh and Quality Ingredients</h2>
          <p>We use only the freshest ingredients in our dishes. Quality is our top priority, and it shows in every bite.</p>
        </section>
      </div> */}
      {/* <div className="main-container" style={{ backgroundImage: `url()` }}>
        <section className="section-content4">
          <h2>Customer Reviews</h2>
          <p>Read what our customers are saying about us! We take pride in providing the best service and quality food.</p>
        </section>
      </div> */}

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

export default Home;
