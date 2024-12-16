import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-lg font-bold">
                    StockTrader
                </Link>
                <div>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="mr-4">
                                Dashboard
                            </Link>
                            <Link to="/trade" className="mr-4">
                                Trade
                            </Link>
                            <Link to="/analytics" className="mr-4">
                                Analytics
                            </Link>
                            <button onClick={handleLogout} className="bg-red-500 px-3 py-2 rounded">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="mr-4">
                                Login
                            </Link>
                            <Link to="/register" className="bg-green-500 px-3 py-2 rounded">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
