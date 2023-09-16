import React from "react";
import Layout from "../src/ui-components/layout";
import PrivateContent from "src/components/PrivateContent";
import Blog from "src/Pages/blog";

const BlogPage = () => {
  return (
    <PrivateContent>
      <Layout>
        <Blog />
      </Layout>
    </PrivateContent>
  );
};

BlogPage.displayName = "BlogPage";

export default BlogPage