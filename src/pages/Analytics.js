import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { fetchStockHistory } from '../services/api';

const Analytics = () => {
    const [symbol, setSymbol] = useState('');
    const [chartData, setChartData] = useState(null);
    const [chartInstance, setChartInstance] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await fetchStockHistory(symbol);
            setChartData(data);
        } catch (error) {
            alert(`Error fetching stock data: ${error.message}`);
        }
    };

    useEffect(() => {
        if (chartData) {
            const ctx = document.getElementById('stockChart').getContext('2d');
            if (chartInstance) chartInstance.destroy(); // Destroy the previous chart
            const newChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartData.dates,
                    datasets: [
                        {
                            label: `${symbol} Price History`,
                            data: chartData.prices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false,
                        },
                    ],
                },
            });
            setChartInstance(newChartInstance);
        }
    }, [chartData, chartInstance, symbol]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Stock Analytics</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Stock Symbol</label>
                    <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Analyze
                </button>
            </form>
            <div className="mt-6">
                <canvas id="stockChart"></canvas>
            </div>
        </div>
    );
};

export default Analytics;
