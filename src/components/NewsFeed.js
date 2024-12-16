import React, { useState, useEffect } from "react";
import { getMarketNews } from "../services/api";

const NewsFeed = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getMarketNews();
                setNews(data);
            } catch (error) {
                console.error("Error fetching market news:", error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="news-feed">
            <h2>Market News</h2>
            <ul>
                {news.map((article, index) => (
                    <li key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsFeed;
