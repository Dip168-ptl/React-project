
import React, { useState } from 'react';
import './register.css';

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    pincode: '',
    contact: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};

    // Name validation (no numbers, no special characters, max 150 characters)
    const namePattern = /^[A-Za-z\s]{1,150}$/;
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    } else if (!namePattern.test(data.name)) {
      errors.name = 'Name must be alphabetic and up to 150 characters long';
    }

    // Email validation (simple regex for email format)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(data.email)) {
      errors.email = 'Invalid email format';
    }

    // Password validation
    if (!data.password.trim()) {
      errors.password = 'Password is required';
    } else if (data.password.length !== 8) {
      errors.password = 'Password must be exactly 8 characters';
    }

    // Password validation (must be at least 8 characters, include uppercase, lowercase, number, and special character)
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;
    if (!data.password.trim()) {
      errors.password = 'Password is required';
    } else if (!passwordPattern.test(data.password)) {
      errors.password = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
    }

    // Pincode validation (only digits, exactly 6 digits, no alphabets)
    const pincodePattern = /^\d{6}$/;
    if (!data.pincode.trim()) {
      errors.pincode = 'Pincode is required';
    } else if (!pincodePattern.test(data.pincode)) {
      errors.pincode = 'Pincode must be exactly 6 digits';
    }

    // Address validation (no special characters, max 250 characters)
    const addressPattern = /^[A-Za-z0-9\s]{1,250}$/;
    if (!data.address.trim()) {
      errors.address = 'Address is required';
    } else if (!addressPattern.test(data.address)) {
      errors.address = 'Address must not contain special characters and must be up to 250 characters';
    }

    // Contact validation (only digits, exactly 10 digits, no all-zero, no spaces, no special characters)
    const contactPattern = /^[1-9][0-9]{9}$/;
    if (!data.contact.trim()) {
      errors.contact = 'Contact number is required';
    } else if (!contactPattern.test(data.contact)) {
      errors.contact = 'Contact number must be exactly 10 digits and cannot contain all zeros';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      console.log('Registration successful:', result);
      setSuccessMessage('Registration successful!');
      setData({ name: '', email: '', password: '', address: '', pincode: '', contact: '' });
    } catch (err) {
      console.error('Error during registration:', err.message);
      setSuccessMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className='container'>
      <div className="register-form">
        <div className="head">
          <div className="txt">Register</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={onSubmit}>
          <div className="inputs">
            <label htmlFor="name">Name :</label>
            <div className="inputr">
              <input
                type="text"
                name="name"
                value={data.name}
                placeholder="Enter Full Name"
                onChange={onChange}
                required
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <label htmlFor="Email">Email :</label>
            <div className="inputr">
              <input
                type="email"
                name="email"
                value={data.email}
                placeholder="Enter Email"
                onChange={onChange}
                required
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <label htmlFor="Password">Password :</label>
            <div className="inputr">
              <input
                type="password"
                name="password"
                value={data.password}
                placeholder="Enter Password"
                onChange={onChange}
                maxLength="8"
                required
              />
              {errors.password && <div className="error">{errors.password}</div>}
            </div>

            <label htmlFor="Address">Address :</label>
            <div className="inputr">
              <textarea
                id="textarea"
                name="address"
                value={data.address}
                rows="3"
                cols="40"
                placeholder="Enter Address"
                onChange={onChange}
              />
              {errors.address && <div className="error">{errors.address}</div>}
            </div>

            <label htmlFor="Pincode">Pincode :</label>
            <div className="inputr">
              <input
                type="text"
                name="pincode"
                value={data.pincode}
                placeholder="Enter Pincode"
                onChange={onChange}
		maxLength="6"
                onInput={(e) => e.target.value = e.target.value.slice(0, 6)}
              />
              {errors.pincode && <div className="error">{errors.pincode}</div>}
            </div>

            <label htmlFor="contact">Contact :</label>
            <div className="inputr">
              <input
                type="text"
                name="contact"
                value={data.contact}
                placeholder="Enter Contact Number"
                onChange={onChange}
                maxLength="10"
                onInput={(e) => e.target.value = e.target.value.slice(0, 10)}
              />
              {errors.contact && <div className="error">{errors.contact}</div>}
            </div>

            <div className="login-link">
              Already have an account? <a href="./Login" className="link">Login here</a>
            </div>
            <button type="submitr" className="submitr-btnr">Register</button>
          </div>
        </form>
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
};

export default Register;
