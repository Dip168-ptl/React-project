// AuthContext.js
// import { createContext, useContext, useState } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if the user is logged in from localStorage or session
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setIsLoggedIn(true);
          setUser(storedUser);
        }
      }, []);

      const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Save user data in localStorage
      };
      
    
      const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user'); // Clear localStorage on logout
      };

      return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );

    // const [user, setUser] = useState(null);

    // const login = (userData) => {
    //     setUser(userData);
    //   };
    
    //   const logout = () => {
    //     setUser(null);
    //   };

    // return (
    //     <AuthContext.Provider value={{ user, login, logout }}>
    //         {children}
    //     </AuthContext.Provider>
    // );
};

export const useAuth = () => useContext(AuthContext);
