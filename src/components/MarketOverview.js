import React, { useState, useEffect } from "react";
import { getMarketOverview } from "../services/api";

const MarketOverview = () => {
    const [marketData, setMarketData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMarketOverview();
                setMarketData(data);
            } catch (error) {
                console.error("Error fetching market overview:", error);
            }
        };

        fetchData();
    }, []);

    if (!marketData) {
        return <p>Loading market data...</p>;
    }

    return (
        <div className="market-overview">
            {/* <h2>Market Overview</h2>
            <div className="indices">
                {marketData.indices.map((index, i) => (
                    <div key={i} className="index">
                        <p>{index.name}</p>
                        <p>{index.price}</p>
                        <p>{index.change}%</p>
                    </div>
                ))}
            </div>
             */}
            <h2 className="text-2xl font-semibold mb-4">Market Overview</h2>
            <div className="indices grid grid-cols-3 gap-4">
                {marketData.indices.map((index, i) => (
                    <div
                        key={i}
                        className="index p-4 bg-gray-100 rounded shadow"
                    >
                        <p className="font-bold">{index.name}</p>
                        <p className="text-green-500">${index.price}</p>
                        <p
                            className={`text-sm ${
                                index.change > 0
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {index.change}%
                        </p>
                    </div>
                ))}
            </div>
            <h3>Top Gainers</h3>
            <ul>
                {marketData.gainers.map((stock, i) => (
                    <li key={i}>
                        {stock.symbol}: {stock.price} ({stock.change}%)
                    </li>
                ))}
            </ul>
            <h3>Top Losers</h3>
            <ul>
                {marketData.losers.map((stock, i) => (
                    <li key={i}>
                        {stock.symbol}: {stock.price} ({stock.change}%)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MarketOverview;
