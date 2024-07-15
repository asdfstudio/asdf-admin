import Card from "@aio/components/Card";
import styles from "../dashboard/Home.module.css";

import HeaderSection from "@aio/components/HeaderSection";
import DataCard from "@aio/components/DataCard";
import Section from "@aio/components/Section";

import DoughnutChartExample from "../../components/chart/DoughnutChartExample";
import BarChartExample from "../../components/chart/BarChartExample";

import { useSelector } from "react-redux";
import Link from "next/link";
import {
  getLast12MonthsVisitors,
  getLast30DaysVisitors,
  getLast7DaysVisitors,
  getLastCustomDaysVisitors,
  getMonthlyVisitorCount,
  getTodayVisitorCount,
  getTop3Portfolios,
  getTop3PortfoliosByVisitorCount,
  getWeeklyVisitorCount,
  previousYearVisitors
} from "src/selector";
import RadarChart from "src/components/chart/RadarChart";
import LineChart from "src/components/chart/LineChart";
import SectionLarge from "@aio/components/SectionLarge";
import StackedBarLineChart from "src/components/chart/StackedBarLineChart";
import VisitorFilter from "src/components/chart/Component/VisitorFilter";
import { useState } from "react";
import StackedBarChart from "src/components/chart/StackedBarChart ";
import PortfolioTable from "@aio/components/PortfolioTable";

export default function Dashboard() {
  const auth = useSelector((state) => state.auth);
  const visitor = useSelector((state) => state.visitor.visitor);
  const [top3PortfolioNames, top3PortfolioCounts] =
    useSelector(getTop3Portfolios);
  const raderData = useSelector(getTop3PortfoliosByVisitorCount);
  const portfolios = useSelector((state) => state.portfolio);

  const totalPortfolios = portfolios.portfolios.length;
  const role = auth.user.role;
  const upperRole = role.toUpperCase();

  const todayVisitorCount = useSelector(getTodayVisitorCount);
  const weeklyVisitorCount = useSelector(getWeeklyVisitorCount);
  const monthlyVisitorCount = useSelector(getMonthlyVisitorCount);
  const Last7DaysVisitors = useSelector(getLast7DaysVisitors);
  const Last30DaysVisitors = useSelector(getLast30DaysVisitors);
  const Last12MonthsVisitors = useSelector(getLast12MonthsVisitors);
  const PreviousYearVisitors = useSelector(previousYearVisitors);

  // Custom visitors
  const [selectedDays, setSelectedDays] = useState(30);

  const handleFilterChange = (days) => {
    setSelectedDays(days);
  };

  const LastCustomsDaysVisitors = useSelector(
    getLastCustomDaysVisitors(selectedDays)
  );

  return (
    <>
      <HeaderSection
        heading={`${upperRole}'s, Statistics`}
        subHeading={`Hello, ${auth.user.name}. Welcome to airlyStudio.`}
      />

      <SectionLarge>
        <div className={styles["graphCard_Collection"]}>
          <div className={styles["firstCard"]}>
            <Card
              heading="Top 3 portfolio visit"
              subHeading="Visitor count of top 3 portfolios of all time"
              topRight="false"
              footerRight="false"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <DoughnutChartExample
                  top3PortfolioNames={top3PortfolioNames}
                  top3PortfolioCounts={top3PortfolioCounts}
                />
              </div>
            </Card>
          </div>

          <div className={styles["secondCard"]}>
            <Card
              heading="Portfolio time spent"
              subHeading="Shows how many minutes client have spend on portfolio "
              topRight="false"
              footerRight="false"
            >
              <RadarChart raderData={raderData} />
            </Card>
          </div>
          <div className={styles["thirdCard"]}>
            <Card
              heading="Site visitors of this week"
              subHeading="Lets see how data is ploting on chartjs"
              topRight="false"
              footerRight="false"
            >
              <BarChartExample data={Last7DaysVisitors} />
            </Card>
          </div>
        </div>
      </SectionLarge>

      <SectionLarge className={styles["graphCard"]}>
        <div>
          <Card
            heading="Site visitors of last days"
            subHeading="Lets see how data is ploting on chartjs"
            topRight="false"
            footerRight="false"
          >
            <div className={styles["customVisitorSelector"]}>
              <VisitorFilter onFilterChange={handleFilterChange} />
            </div>
            <StackedBarLineChart data={LastCustomsDaysVisitors} valuesForXAxis="month" dataForLineGraph="anotherCount"/>
          </Card>
        </div>
      </SectionLarge>

      <SectionLarge className={styles["graphCard"]}>
        <div>
          <Card
            heading="Site visitors of this year"
            subHeading="Lets see how data is ploting on chartjs"
            topRight="false"
            footerRight="false"
          >
            <LineChart data={Last12MonthsVisitors} />
          </Card>
        </div>
      </SectionLarge>

      <SectionLarge className={styles["graphCard"]}>
        <div>
          <Card
            heading="Site visitors of this and previous year"
            subHeading="Lets see how data is comapred to previous year"
            topRight="false"
            footerRight="false"
          >
            <StackedBarLineChart data={PreviousYearVisitors} valuesForXAxis="year" dataForLineGraph="count"/>
          </Card>
        </div>
      </SectionLarge>
    </>
  );
}
