import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateTest } from "@redux/modules";

const useReduxTest = () => {
  const test = useSelector((state: RootState) => state.test);
  const dispatch = useDispatch();

  const onSwitchTest = React.useCallback(
    () => dispatch(updateTest()),
    [dispatch],
  );

  return {
    test,
    onSwitchTest,
  };
};

export default useReduxTest;
