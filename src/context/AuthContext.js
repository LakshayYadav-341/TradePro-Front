import React, { createContext, useState, useEffect } from 'react';
import { loginUser, fetchUserProfile } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (credentials) => {
        const { token } = await loginUser(credentials);
        localStorage.setItem('authToken', token);
        const userProfile = await fetchUserProfile();
        setUser(userProfile);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const userProfile = await fetchUserProfile();
                    setUser(userProfile);
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    logout();
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => React.useContext(AuthContext);
export default AuthContext;
