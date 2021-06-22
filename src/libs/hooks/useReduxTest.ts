import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateTest } from "@redux/actions/test";

const useReduxTest = () => {
  const test = useSelector((state: RootState) => state.test);
  const dispatch = useDispatch();

  const onUpdateTest = React.useCallback(
    () => dispatch(updateTest()),
    [dispatch],
  );

  return {
    test,
    onUpdateTest,
  };
};

export default useReduxTest;
