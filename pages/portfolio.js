import React from "react";
import Layout from "../src/ui-components/layout";
import Portfolio from "../src/Pages/portfolio";
import PrivateContent from "src/components/PrivateContent";

const PortfolioPage = () => {
  return (
    <PrivateContent>
      <Layout>
        <Portfolio />
      </Layout>
    </PrivateContent>
  );
};

PortfolioPage.displayName = "PortfolioPage"; // Add the displayName

export default PortfolioPage