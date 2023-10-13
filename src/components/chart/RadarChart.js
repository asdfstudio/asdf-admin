import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const RadarChart = ({raderData}) => {
  const chartRef = useRef();
  const chartObj = useRef();

  const createRadarChart = (el) => {

    //   const data = [
    //     {
    //       month: "Portfolio",
    //       count: 1
    //     },
    //     {
    //       month: "portfolio 2",
    //       count: 1
    //     },
    //     {
    //       month: "Portfolio 3",
    //       count: 1
    //     },
    //     {
    //       month: "Testing tags",
    //       count: 1
    //     }
    // ]

    chartObj.current = new Chart(el, {
      type: "radar",
      data: {
        labels: raderData.map((row) => row.month),
        datasets: [
          {
            label: "Acquisitions by portfolio",
            data: raderData.map((row) => row.count),
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
  }, [raderData]);

  return <canvas ref={chartRef}></canvas>;
};

export default RadarChart;
