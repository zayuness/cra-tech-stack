import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { thunks } from "@root/redux/modules";

const { fetchUserById } = thunks;

const useReduxUser = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const onFetchUserById = React.useCallback(
    async (userId: number) => {
      const resultAction = await dispatch(fetchUserById(userId));
      return resultAction;
    },
    [dispatch],
  );

  return { user, onFetchUserById };
};

export default useReduxUser;
