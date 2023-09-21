import React from "react";
import Layout from "../src/ui-components/layout";
import PrivateContent from "src/components/PrivateContent";
import User from "src/Pages/user";

const UserPage = () => {
  return (
    <PrivateContent>
      <Layout>
        <User />
      </Layout>
    </PrivateContent>
  );
};

UserPage.displayName = "UserPage";

export default UserPage