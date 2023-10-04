import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DoughnutChartExample = (props) => {
  const chartRef = useRef();
  const chartObjRef = useRef();

  const createDoughnutChart = (el) => {
    const data = {
      labels: ["Portfolio 1", "Portfolio 2", "Portfolio 3"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };
    const config = {
      type: "doughnut",
      data,
      responsive: true,
    };
    chartObjRef.current = new Chart(el, config);
  };

  useEffect(() => {
    const el = chartRef.current;
    if (chartObjRef.current) chartObjRef.current.destroy();
    createDoughnutChart(el);

    return () => chartObjRef.current.destroy();
  }, []);

  return (
      <canvas ref={chartRef}></canvas>
  );
};

export default DoughnutChartExample;
