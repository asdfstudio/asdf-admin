import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const RadarChart = (props) => {
  const chartRef = useRef();
  const chartObj = useRef();

  const createRadarChart = (el) => {
    const data = [
      { month: "January", count: 10 },
      { month: "February", count: 20 },
      { month: "March", count: 15 },
      { month: "April", count: 25 },
      { month: "May", count: 22 },
      { month: "June", count: 30 },
      { month: "July", count: 28 },
    ];

    chartObj.current = new Chart(el, {
      type: "radar",
      data: {
        labels: data.map((row) => row.month),
        datasets: [
          {
            label: "Acquisitions by month",
            data: data.map((row) => row.count),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: false,
            },
            suggestedMin: 0,
          },
        },
      },
    });
  };

  useEffect(() => {
    const el = chartRef.current;
    if (chartObj.current) chartObj.current.destroy();
    createRadarChart(el);

    return () => chartObj.current.destroy();
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default RadarChart;
