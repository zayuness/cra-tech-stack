import React from "react";

import { useReduxTest } from "@libs/hooks";

const Test = () => {
  const { test, onSwitchTest } = useReduxTest();

  const click = () => onSwitchTest();

  return (
    <button onClick={click}>
      {test.testState ? "testState: true" : "testState: false"}
    </button>
  );
};

export default Test;
