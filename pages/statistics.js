import React from "react";
import PrivateContent from "src/components/PrivateContent";
import Statistics from "../src/Pages/Statistics";
import Layout from "../src/ui-components/layout";

const StatisticsPage = () => (
  <PrivateContent>
    <Layout>
      <Statistics />
    </Layout>
  </PrivateContent>
);

StatisticsPage.displayName = "StatisticsPage"; // Add the displayName

export default StatisticsPage;
