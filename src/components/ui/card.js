// src/components/ui/card.js

import React from 'react';

export const Card = ({ children }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">{children}</div>
    );
};

export const CardHeader = ({ children }) => {
    return <div className="mb-4">{children}</div>;
};

export const CardContent = ({ children }) => {
    return <div>{children}</div>;
};

export const CardTitle = ({ children }) => {
    return <div className="text-lg font-semibold text-gray-800">{children}</div>;
};
