import React, { createContext, useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

// Create a context
export const UserContext = createContext();
// Create a provider component
export const UserProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [id, setID] = useState('');
    const navigate = useNavigate();

    const login = async () => {
       window.location.href = 'startalk-api/auth/login';
    };

    const logout = async () => {
        try {
            const response = await axios.get('/startalk-api/auth/logout', {
                withCredentials: true,
            });

            if (response.status === 200) {
                setIsAuthenticated(false);
                setRole('');
                setName('');
                setID('');
                navigate('/');
            }
        } catch (error) {
            // Handle error
        }
    };

    const handleDisconnectErrResponse = (error) => {
        if (error.response && error.response.status === 415) { // that's mean backend send a disconnect error
            setIsAuthenticated(false);
            setRole('');
            setName('');
            setID('');
            navigate('/');
        }
    };

    const fetchUserAfterLoginData = async () => {
        try {
            const response = await axios.get('/startalk-api/users/@me', {
                withCredentials: true
            });

            // If the request is successful and user data is returned
            if (response.data !== null) {
                setIsAuthenticated(true);
                setRole(response.data.roles);
                setName(response.data.name);
                setID(response.data.id)
            }
        } catch (error) {
            // Handle error
            handleDisconnectErrResponse(error)
        }
    };

    // Value to be provided to consuming components
    const value = {
        isAuthenticated,
        role,
        name,
        id,
        login,
        logout,
        handleDisconnectErrResponse,
        fetchUserAfterLoginData
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
