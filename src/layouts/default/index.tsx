import React from "react";

import controller from "@libs/controller";

const DefaultLayout = ({ children }: ReactProps) => {
  return (
    <>
      {controller.isMobile ? (
        <MobileLayout>{children}</MobileLayout>
      ) : (
        <PCLayout>{children}</PCLayout>
      )}
    </>
  );
};

const PCLayout = ({ children }: ReactProps) => {
  return <>{children}</>;
};

const MobileLayout = ({ children }: ReactProps) => {
  return <>{children}</>;
};

export default DefaultLayout;
