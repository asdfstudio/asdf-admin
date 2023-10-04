import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const LineChart = ({ data = [] }) => {
  const chartRef = useRef();
  const chartObj = useRef();

  const createLineChart = (el) => {
    chartObj.current = new Chart(el, {
      type: "line",
      data: {
        labels: data.map((row) => row.month),
        datasets: [
          {
            label: "Acquisitions by month",
            data: data.map((row) => row.count),
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
          },
        },
      },
    });
  };

  useEffect(() => {
    const el = chartRef.current;
    if (data && data.length > 0) {
      if (chartObj.current) chartObj.current.destroy();
      createLineChart(el);
    }

    return () => {
      if (chartObj.current) chartObj.current.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} width="100%" height="30%"></canvas>;
};

export default LineChart;
