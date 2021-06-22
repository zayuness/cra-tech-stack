import React from "react";
import { Helmet } from "react-helmet-async";

import controller from "@libs/controller";

const Page = (props: Page) => {
  const { head, layout, Component } = props;
  const Layout = controller.selectLayout(layout);
  return () => {
    return (
      <>
        <Helmet>
          <title>{head.title}</title>
          {head.tags}
        </Helmet>
        <Layout>
          <Component />
        </Layout>
      </>
    );
  };
};

export default Page;
