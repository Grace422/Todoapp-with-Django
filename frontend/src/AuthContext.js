// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        // Check if a token exists in localStorage and fetch user details
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });  // Fetch user data if needed using token
        }
    }, []);

    const login = (token) => {
        setUser({ token });
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
