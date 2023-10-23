import BarChartExample from "../../components/chart/BarChartExample";
import DoughnutChartExample from "../../components/chart/DoughnutChartExample";
import Card from "@aio/components/Card";
import HeaderSection from "@aio/components/HeaderSection";
import Section from "@aio/components/Section";
import styles from "./Statistics.module.css";
import SectionLarge from "@aio/components/SectionLarge";
import RadarChart from "src/components/chart/RadarChart";
import LineChart from "src/components/chart/LineChart";

const Statistics = () => {
  const cardContainer = {
    width: "400px",
    height: "300px",
    marginRight: "10px",
  };
  return (
    <>
      <HeaderSection
        heading={"Statistics Report"}
        subHeading={"Visualize your data"}
      />
    </>
  );
};

export default Statistics;
