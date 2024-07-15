import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const StackedBarLineChart = ({ data = [] , valuesForXAxis='' ,dataForLineGraph='' }) => {
  const chartRef = useRef();
  const chartObj = useRef();

  const createStackedBarLineChart = (el) => {
    chartObj.current = new Chart(el, {
      type: "bar",
      data: {
        labels: data.map((row) => row[valuesForXAxis]),
        datasets: [
          {
            label: "Dataset 1 (Line)",
            type: "line",
            data: data.map((row) => row[dataForLineGraph]),
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            pointRadius: 3,
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            yAxisID: "y-axis-1", // Assign to the first (and only) y-axis
          },
          {
            label: "Dataset 2 (Stacked Bar)",
            type: "bar",
            data: data.map((row) => row.count),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            yAxisID: "y-axis-1", // Assign to the first (and only) y-axis
          },
        ],
      },
      options: {
        scales: {
          y: [
            {
              type: "linear",
              display: true,
              position: "left",
              id: "y-axis-1",
            },
          ],
        },
      },
    });
  };

  useEffect(() => {
    const el = chartRef.current;
    if (data && data.length > 0) {
      if (chartObj.current) chartObj.current.destroy();
      createStackedBarLineChart(el);
    }

    return () => {
      if (chartObj.current) chartObj.current.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} width="100%" height="30%"></canvas>;
};

export default StackedBarLineChart;
