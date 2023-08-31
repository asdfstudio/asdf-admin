import React from "react";
import PrivateContent from "src/components/PrivateContent";
import Profile from "../src/Pages/Profile";
import Layout from "@aio/components/layout";

const ProfilePage = () => (
  <PrivateContent>
    <Layout>
      <Profile />
    </Layout>
  </PrivateContent>
);

ProfilePage.displayName = "ProfilePage"; // Add the displayName

export default ProfilePage;
