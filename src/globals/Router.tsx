import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import pages from "@pages";
import Page from "./Page";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {pages.map((page) => (
          <Route
            key={page.name}
            exact
            path={page.path}
            component={Page(page)}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
