import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const BarChartExample = ({
  props,
  data=[],
}) => {
  const chartRef = useRef();
  const chartObj = useRef();

  const createBarChart = (el) => {
        // const data = [
    //   { day: "Monday", count: 10 },
    //   { year: "Tuesday", count: 20 },
    //   { year: "Wednesday", count: 15 },
    //   { year: "Thursday", count: 25 },
    //   { year: "Friday", count: 22 },
    //   { year: "Saturday", count: 30 },
    //   { year: "Sunday", count: 28 },
    // ];
    chartObj.current = new Chart(el, {
      type: "bar",
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: "Acquisitions by day",
            data: data.map((row) => row.count),
          },
        ],
      },
    });
  };

  useEffect(() => {
    const el = chartRef.current;
    
    if (chartObj.current) chartObj.current.destroy();
    createBarChart(el);

    return () => chartObj.current.destroy();
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChartExample;
