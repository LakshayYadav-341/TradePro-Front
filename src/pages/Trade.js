import React, { useState } from 'react';
import { buyStock, sellStock } from '../services/api';

const Trade = () => {
    const [formData, setFormData] = useState({ stockSymbol: '', quantity: '', action: 'buy' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { stockSymbol, quantity, action } = formData;

        try {
            if (action === 'buy') {
                await buyStock({ stockSymbol, quantity: Number(quantity) });
                setMessage(`Successfully bought ${quantity} shares of ${stockSymbol}`);
            } else {
                await sellStock({ stockSymbol, quantity: Number(quantity) });
                setMessage(`Successfully sold ${quantity} shares of ${stockSymbol}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Trade Stocks</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Stock Symbol</label>
                    <input
                        type="text"
                        name="stockSymbol"
                        value={formData.stockSymbol}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Action</label>
                    <select
                        name="action"
                        value={formData.action}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
            {message && (
                <p className="mt-4 text-center text-green-500 font-bold">{message}</p>
            )}
        </div>
    );
};

export default Trade;
