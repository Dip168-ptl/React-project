import React, { useState } from "react";
import './forgotpass.css'; // Make sure this file exists and is correctly imported.

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessageColor, setResponseMessageColor] = useState(''); // Added this state to handle color

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setResponseMessage('Please enter your email address.');
      setResponseMessageColor('#ff0000'); // Red for error
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendPasswordResetRequest(email);
      setResponseMessage(response.message);
      setResponseMessageColor('#28a745'); // Green for success
    } catch (error) {
      setResponseMessage(error.message);
      setResponseMessageColor('#ff0000'); // Red for error
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function to simulate sending a password reset request
  const sendPasswordResetRequest = (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'example@example.com') {
          resolve({ message: 'Password reset link has been sent to your email.' });
        } else {
          reject({ message: 'Email address not found.' });
        }
      }, 1000); // Simulate network delay
    });
  };

  return (
    <div className="container6">
    <div className="forgot-password-container">
      <div className="uline">
      <div className="ul">Forgot Password</div>
      <div className="line"></div>
      </div>
      <p className="sentence"> Enter your email address and we'll send you an email 
        with instructions to reset your password. </p>
      <form onSubmit={handleSubmit} id="forgot-password-form">
        <div className="form-groupforgot">
          <label htmlFor="email"> Email Address : </label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        
        <button type="submit2" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
        
        {responseMessage && (
          <p style={{ color: responseMessageColor }}>{responseMessage}</p>
        )}
        </div>
      </form>
    </div><br></br>
    <div className="login-link">
              Back to <a href="./Login" className="link"> Login </a>
          </div>
    </div>
  );
};

export default ForgotPass;
