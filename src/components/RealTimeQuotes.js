import React, { useState, useEffect } from "react";
import axios from "axios";

function RealTimeQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(
          `https://api.stockdata.org/v1/data/quote?symbols=AAPL,TSLA,MSFT&api_token=YOUR_API_TOKEN`
        );
        setQuotes(response.data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchQuotes();
  }, []);

  return (
    <div className="realtime">
      <h2>Real-Time Quotes</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {quotes.map((quote) => (
            <li key={quote.ticker}>
              {quote.name} ({quote.ticker}): ${quote.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RealTimeQuotes;