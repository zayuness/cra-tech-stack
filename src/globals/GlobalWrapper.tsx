import React from "react";
import { Provider as ReduxProvider } from "react-redux";

import store from "@redux/store";

import { HelmetProvider } from "react-helmet-async";
import GlobalCSS from "./GlobalCSS.";

const GlobalWrapper = ({ children }: ReactProps) => {
  return (
    <>
      <GlobalCSS />
      <ReduxProvider store={store}>
        <HelmetProvider>{children}</HelmetProvider>
      </ReduxProvider>
    </>
  );
};

export default GlobalWrapper;
