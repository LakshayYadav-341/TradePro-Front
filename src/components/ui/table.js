// src/components/ui/table.js

import React from 'react';

export const Table = ({ children }) => {
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">{children}</table>
        </div>
    );
};

export const TableHeader = ({ children }) => {
    return (
        <thead className="bg-gray-100 border-b border-gray-200">{children}</thead>
    );
};

export const TableBody = ({ children }) => {
    return <tbody>{children}</tbody>;
};

export const TableRow = ({ children }) => {
    return <tr className="text-left">{children}</tr>;
};

export const TableHead = ({ children }) => {
    return (
        <th className="px-4 py-3 text-sm font-medium text-gray-600">{children}</th>
    );
};

export const TableCell = ({ children }) => {
    return (
        <td className="px-4 py-3 text-sm text-gray-800">{children}</td>
    );
};
