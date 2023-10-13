import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DoughnutChartExample = ({
  top3PortfolioNames,
  top3PortfolioCounts
}) => {
  const chartRef = useRef();
  const chartObjRef = useRef();

  const createDoughnutChart = (el) => {
    const data = {
      labels: top3PortfolioNames,
      datasets: [
        {
          label: "My First Dataset",
          data: top3PortfolioCounts,
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
  }, [top3PortfolioNames]);

  return (
      <canvas ref={chartRef}></canvas>
  );
};

export default DoughnutChartExample;
