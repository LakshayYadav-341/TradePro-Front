import React, { useState, useEffect } from "react";
import axios from "axios";

function IntradayData() {
  const [intradayData, setIntradayData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIntradayData = async () => {
      try {
        const response = await axios.get(
          `https://api.stockdata.org/v1/data/intraday?symbols=AAPL&api_token=YOUR_API_TOKEN`
        );
        setIntradayData(response.data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchIntradayData();
  }, []);

  return (
    <div className="intraday">
      <h2>Intraday Data</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {intradayData.map((dataPoint, index) => (
            <li key={index}>
              {dataPoint.date}: Open ${dataPoint.data.open}, High ${dataPoint.data.high}, Low ${dataPoint.data.low}, Close ${dataPoint.data.close}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IntradayData;