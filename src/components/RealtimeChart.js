import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const RealtimeChart = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;

        // Destroy existing chart to avoid duplication
        if (chartInstance.current) chartInstance.current.destroy();

        chartInstance.current = new Chart(chartRef.current, {
            type: "line",
            data: {
                labels: data.timestamps,
                datasets: [
                    {
                        label: "Price",
                        data: data.prices,
                        borderColor: "rgba(75, 192, 192, 1)",
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: true,
            },
        });
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default RealtimeChart;
