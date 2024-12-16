import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Rocket, BarChart3, FileText, User2, RefreshCcw } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Client-side validation
        if (!validateEmail(formData.email)) {
            setError("Please enter a valid email address");
            return;
        }

        // if (formData.password.length < 6) {
        //     setError("Password must be at least 6 characters long");
        //     return;
        // }

        try {
            await login(formData);
            navigate('/dashboard');
        } catch (error) {
            setError('Login failed: ' + error.message);
        }
    };

    const iconVariants = {
        hover: { scale: 2.1, rotate: 10 },
    }

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left Section */}
            <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                <div className="">
                    <div className="mb-12 mx-auto w-[300px] h-[90px] text-5xl font-bold bg-white/20 flex items-center justify-center rounded">
                        TradePRO
                    </div>
                    <h1 className="text-3xl mx-auto font-bold text-white mb-6 text-center max-w-lg">
                        Seamless Authentication<br/> & Trade Management
                    </h1>
                    <div className="relative mx-auto w-72 h-72">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[80px] h-[80px] bg-white/20 rounded-full flex items-center justify-center">
                                Logo
                            </div>
                        </div>
                        {[
                            { Icon: FileText, position: 'top-0 left-1/2 -translate-x-1/2' },
                            { Icon: User2, position: 'top-1/2 right-0 -translate-y-1/2' },
                            { Icon: Rocket, position: 'bottom-1/2 right-1/4 translate-y-1/2' },
                            { Icon: BarChart3, position: 'bottom-0 left-1/2 -translate-x-1/2' },
                            { Icon: RefreshCcw, position: 'top-1/2 left-0 -translate-y-1/2' },
                        ].map(({ Icon, position }, index) => (
                            <motion.div
                                key={index}
                                className={`absolute ${position} bg-blue-500 p-4 rounded-full`}
                                whileHover="hover"
                                variants={iconVariants}
                            >
                                <Icon className="w-6 h-6 text-white" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-center p-8">
                <div className="max-w-md my-auto pt-16 mx-auto w-full">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                        <p className="text-gray-600">Sign in to continue to your dashboard</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <div className="flex justify-between mt-2">
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id="remember" 
                                        className="mr-2"
                                    />
                                    <label htmlFor="remember" className="text-sm text-gray-600">
                                        Remember me
                                    </label>
                                </div>
                                <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md" role="alert">
                                {error}
                            </div>
                        )}
                        
                        <button
                            type="submit"
                            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account? 
                        <a href="/signup" className="ml-1 text-blue-600 hover:underline">
                            Sign up
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-8 text-center text-sm text-gray-500">
                    <p>© 2024 | Ver 1.0 | Your Company</p>
                    <div className="flex justify-center space-x-4 mt-2">
                        <a href="/help" className="hover:text-gray-700">Help</a>
                        <a href="/privacy" className="hover:text-gray-700">Privacy</a>
                        <a href="/terms" className="hover:text-gray-700">Terms</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;