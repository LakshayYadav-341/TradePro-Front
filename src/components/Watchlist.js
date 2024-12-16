import React, { useEffect, useState } from "react";
import { getWatchlistData } from "../services/api";
import { useSocket } from "../services/socket";

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const socket = useSocket();

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const data = await getWatchlistData();
                setWatchlist(data);
            } catch (error) {
                console.error("Error fetching watchlist:", error);
            }
        };

        fetchWatchlist();

        socket.on("watchlistUpdate", (updatedData) => {
            setWatchlist(updatedData);
        });

        return () => {
            socket.off("watchlistUpdate");
        };
    }, [socket]);

    return (
        <div className="watchlist">
            <h2>Your Watchlist</h2>
            <ul>
                {watchlist.map((stock, index) => (
                    <li key={index}>
                        {stock.symbol}: {stock.price} ({stock.change}%)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Watchlist;
