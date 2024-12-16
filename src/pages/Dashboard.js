import React from 'react';
import { useAuth } from '../hooks/useAuth';
import MarketOverview from "../components/MarketOverview";
import StockSearch from "../components/StockSearch";
import Watchlist from "../components/Watchlist";
import NewsFeed from "../components/NewsFeed";


const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Welcome, {user?.username}!</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Your Portfolio</h2>
                {user?.portfolio?.length > 0 ? (
                    <table className="table-auto w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Stock</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Average Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.portfolio.map((stock, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{stock.stockSymbol}</td>
                                    <td className="border px-4 py-2">{stock.quantity}</td>
                                    <td className="border px-4 py-2">${stock.averagePrice.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-600">No stocks in your portfolio yet.</p>
                )}
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-bold">Balance: ${user?.balance?.toFixed(2)}</h2>
            </div>
            <MarketOverview />
            <StockSearch onStockSelect={(stock) => console.log("Selected Stock:", stock)} />
            <Watchlist />
            <NewsFeed />
        </div>
    );
};

export default Dashboard;
