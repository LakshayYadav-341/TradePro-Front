import React from 'react';

const Footer = () => {
    return (
        <div className="mt-auto pt-8 text-center text-sm text-gray-500">
            <p>© 2024 | Ver 1.0 | TradePRO</p>
            <div className="flex justify-center space-x-4 mt-2">
                <a href="/help" className="hover:text-gray-700">
                    Help
                </a>
                <a href="/privacy" className="hover:text-gray-700">
                    Privacy
                </a>
                <a href="/terms" className="hover:text-gray-700">
                    Terms
                </a>
            </div>
        </div>
    );
};

export default Footer;
