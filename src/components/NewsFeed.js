import React, { useState, useEffect } from "react";
import axios from "axios";

function NewsFeed() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://api.stockdata.org/v1/news/all?symbols=AAPL,TSLA,MSFT&filter_entities=true&language=en&api_token=YOUR_API_TOKEN`
        );
        setNews(response.data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="market-news">
      <h2>Market News</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {news.map((article) => (
            <li key={article.uuid}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NewsFeed;