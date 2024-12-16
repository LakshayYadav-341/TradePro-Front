import React, { useState, useEffect } from "react";
import axios from "axios";

function EndOfDayData() {
  const [eodData, setEodData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEodData = async () => {
      try {
        const response = await axios.get(
          `https://api.stockdata.org/v1/data/eod?symbols=AAPL&api_token=YOUR_API_TOKEN`
        );
        setEodData(response.data.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEodData();
  }, []);

  return (
    <div className="eod">
      <h2>End of Day Data</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {eodData.map((dataPoint, index) => (
            <li key={index}>
              {dataPoint.date}: Open ${dataPoint.open}, High ${dataPoint.high}, Low ${dataPoint.low}, Close ${dataPoint.close}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EndOfDayData;