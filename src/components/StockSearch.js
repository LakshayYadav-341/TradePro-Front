import React, { useState } from "react";
import { searchStock } from "../services/api";

const StockSearch = ({ onStockSelect }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (!query.trim()) return;

        try {
            const stocks = await searchStock(query);
            setResults(stocks);
        } catch (error) {
            console.error("Error searching stocks:", error);
        }
    };

    return (
        <div className="stock-search">
            <input
                type="text"
                placeholder="Search for stocks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((stock, index) => (
                    <li key={index} onClick={() => onStockSelect(stock)}>
                        {stock.symbol} - {stock.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockSearch;
