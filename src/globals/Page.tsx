import React from "react";
import { Helmet } from "react-helmet-async";

import { useReduxUser } from "@libs/hooks";
import controller from "@libs/controller";

const Page = (props: Page) => {
  const { head, layout, Component } = props;
  const Layout = controller.selectLayout(layout);

  const { onFetchUserById } = useReduxUser();
  onFetchUserById(1);

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

export default Page;
