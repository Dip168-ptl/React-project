import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Password validation function (at least 6 characters, uppercase, lowercase, number, special character)
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
        return passwordRegex.test(password);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;

        // Email validation
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Password validation
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long, contain uppercase, lowercase, number, and special character');
            isValid = false;
        } else {
            setPasswordError('');
        }

        // If validation fails, don't submit
        if (!isValid) {
            return;
        }

        const data = { email, password };

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Login failed');
            }

            const result = await response.json();
            console.log('Login successful:', result);
            setErrorMessage('Login successful!'); // Set success message

            // Check for admin, manager, or delivery person credentials
            if (email === 'admin012@gmail.com' && password === 'A12!!admin') {
                navigate('/Adminpage'); // Redirect to Admin Page
            } else if (email === 'manager110@gmail.com' && password === 'RM&110xyz') {
                navigate('/managerdash'); // Redirect to Manager Page
            } else if (email === 'delperson318@gmail.com' && password === 'DP!318qwe') {
                navigate('/Deliveryperdash'); // Redirect to Delivery Person Page
            } else {
                navigate('/Customerdash'); // Redirect to Customer Dashboard
            }

            // Handle token storage
            if (rememberMe) {
                localStorage.setItem('token', result.token);
            } else {
                sessionStorage.setItem('token', result.token);
            }

        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <div className="container1">
            <form className="login-form" onSubmit={onSubmit}>
                <div className="heading">
                    <div className="txt">Login</div>
                    <div className="underline"></div>
                </div>
                <div className="logininputs">
                    <label htmlFor="Email"> Email:</label>
                    <div className="inputl">
                        <input
                            type="email"
                            placeholder=" Enter Email "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {emailError && <p className="error-message">{emailError}</p>}

                    <label htmlFor="Password"> Password:</label>
                    <div className="inputl">
                        <input
                            type="password"
                            placeholder=" Enter Password "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {passwordError && <p className="error-message">{passwordError}</p>}

                    <div className="remember-me">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label>Remember Me</label>
                    </div>

                    <button type="submitl" className="submitl-btnl">Login</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
                <div className="Forgot-password">
                    Forgot password? <a href="./Forgotpass" className="link"> forgot </a>
                </div>
                <br />
                <div className="register-link-outside">
                    Don't have an account? <a href="./register" className="link"> register </a>
                </div>
            </form>
        </div>
    );
}

export default Login;
