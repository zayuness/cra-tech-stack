import React from "react";

import { HelmetProvider } from "react-helmet-async";
import GlobalCSS from "./GlobalCSS.";

const GlobalWrapper = ({ children }: ReactProps) => {
  return (
    <>
      <GlobalCSS />
      <HelmetProvider>{children}</HelmetProvider>
    </>
  );
};

export default GlobalWrapper;
