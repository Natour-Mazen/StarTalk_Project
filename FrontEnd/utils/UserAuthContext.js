import React, { createContext, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

// Create a context
export const UserContext = createContext();
// Create a provider component
export const UserProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const login = async () => {
       window.location.href = 'startalk-api/auth/login';
    };

    const logout = async () => {
        try {
            const response = await axios.get('startalk-api/auth/logout', {
                withCredentials: true,
            });

            if (response.status === 200) {
                setIsAuthenticated(false);
                setRole('');
                setName('');
                navigate('/');
            }
        } catch (error) {
            // Handle error
        }
    };

    const handleErrResponse = (error) => {
        if (error.response && error.response.status === 415) {
            logout();
            navigate('/');
        }
    };


    // Value to be provided to consuming components
    const value = {
        isAuthenticated,
        setIsAuthenticated,
        role,
        setRole,
        name,
        setName,
        login,
        logout,
        handleErrResponse
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
