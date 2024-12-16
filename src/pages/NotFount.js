import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";

const NotFound = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex h-screen flex-col items-center p-8"
            >
                <div className="text-center my-auto pt-24 max-w-md">
                    <motion.h1
                        variants={itemVariants}
                        className="text-6xl font-bold text-blue-700 mb-4"
                    >
                        404
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-600 mb-6"
                    >
                        Oops! The page you're looking for seems to have gone on
                        an unexpected trading expedition.
                    </motion.p>

                    <motion.div variants={itemVariants}>
                        <Link
                            to="/login"
                            className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors duration-300 space-x-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Return to Login</span>
                        </Link>
                    </motion.div>
                </div>

                <Footer/>
            </motion.div>
        </div>
    );
};

export default NotFound;
