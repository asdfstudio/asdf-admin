import Card from "@aio/components/Card";
import styles from "./Home.module.css";

import HeaderSection from "@aio/components/HeaderSection";
import DataCard from "@aio/components/DataCard";
import Section from "@aio/components/Section";

import DoughnutChartExample from "../../components/chart/DoughnutChartExample";
import BarChartExample from "../../components/chart/BarChartExample";

import { useSelector } from "react-redux";
import Link from "next/link";
import { 
  getLast12MonthsVisitors, 
  getLast7DaysVisitors, 
  getMonthlyVisitorCount, 
  getTodayVisitorCount, 
  getWeeklyVisitorCount 
} from "src/selector";
import RadarChart from "src/components/chart/RadarChart";
import LineChart from "src/components/chart/LineChart";
import SectionLarge from "@aio/components/SectionLarge";

export default function Dashboard() {
  const auth = useSelector(state => state.auth);
  const visitor = useSelector(state => state.auth.visitor);
  const portfolios = useSelector(state => state.portfolio);

  const totalPortfolios = portfolios.portfolios.length;
  const role = auth.user.role;
  const upperRole = role.toUpperCase();

  const todayVisitorCount = useSelector(getTodayVisitorCount);
  const weeklyVisitorCount = useSelector(getWeeklyVisitorCount);
  const monthlyVisitorCount = useSelector(getMonthlyVisitorCount);
  const Last7DaysVisitors = useSelector(getLast7DaysVisitors);
  const Last12MonthsVisitors = useSelector(getLast12MonthsVisitors);
  
  return (
    <>
      <HeaderSection
        heading={`${upperRole}'s, Dashboard`}
        subHeading={`Hello, ${auth.user.name}. Welcome to airlyStudio.`}
      />

      <Section>
        <DataCard
          label={"Total Visitor's"}
          value={visitor[0]?.count}
          inverse={true}
        />
        <DataCard
          label={"Today's Visitor"}
          value={todayVisitorCount.count}
          sideLable={todayVisitorCount.dayName}
        />
        <DataCard
          label={"Weekly Visitor"}
          value={weeklyVisitorCount.count}
          sideLable={`Week: ` + weeklyVisitorCount.weekNumber}
        />
        <DataCard
          label={"Monthly Visitor"}
          value={monthlyVisitorCount.count}
          sideLable={monthlyVisitorCount.monthName}
        />
      </Section>

      <Section>
        <Link href={"/portfolio"}>
          <DataCard
            label={"Total Portfolio's"}
            value={totalPortfolios}
            // percentageValue={3.45}
            inverse={true}
          />
        </Link>
      </Section>

      <SectionLarge>
        <div className={styles["graphCard_Collection"]}>
          <div className={styles["firstCard"]}>
            <Card
              heading="Doughnut Chart Example"
              subHeading="Lets see how data is ploting on chartjs"
              topRight= "false"
              footerRight= "false"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <DoughnutChartExample />
              </div>
            </Card>
          </div>

          <div className={styles["secondCard"]}>
            <Card
              heading="Radar Chart Example"
              subHeading="Lets see how data is ploting on chartjs"
              topRight= "false"
              footerRight= "false"
            >
              <RadarChart />
            </Card>
          </div>
          <div className={styles["thirdCard"]}>
            <Card
                heading="Bar Chart Example"
                subHeading="Lets see how data is ploting on chartjs"
                topRight= "false"
                footerRight= "false"
              >
                <BarChartExample 
                  data={Last7DaysVisitors}
                />
              </Card>
          </div>
        </div>
      </SectionLarge>

      <SectionLarge className={styles["graphCard"]}>
        <div>
          <Card
            heading="Line Chart Example"
            subHeading="Lets see how data is ploting on chartjs"
            topRight= "false"
            footerRight= "false"
          >
            <LineChart 
              data={Last12MonthsVisitors}
            />
          </Card>
        </div>
      </SectionLarge>
    </>
  );
}
