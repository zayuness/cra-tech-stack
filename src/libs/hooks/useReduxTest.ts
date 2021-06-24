import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { actions } from "@root/redux/modules";

const { updateTest } = actions;

const useReduxTest = () => {
  const test = useSelector((state: RootState) => state.test);
  const dispatch = useDispatch();

  const onSwitchTest = React.useCallback(
    () => dispatch(updateTest()),
    [dispatch, updateTest],
  );

  return {
    test,
    onSwitchTest,
  };
};

export default useReduxTest;
