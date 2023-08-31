import React from "react";
import Layout from "../src/ui-components/layout";
import Dashboard from "../src/Pages/dashboard";
import PrivateContent from "src/components/PrivateContent";

const App = () => (
    <PrivateContent>
      <Layout>
        <Dashboard />
      </Layout>
    </PrivateContent>
  );
  
  App.displayName = "App";
  
  export default App;