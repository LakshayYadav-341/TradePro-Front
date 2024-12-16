import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuthContext();

    if (loading) return <p>Loading...</p>;

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;