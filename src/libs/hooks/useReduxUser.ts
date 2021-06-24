import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { sagas } from "@root/redux/modules";

const { fetchUserById } = sagas;

const useReduxUser = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const onFetchUserById = React.useCallback(
    (userId: number) => {
      // const resultAction = await dispatch(fetchUserById(userId));
      // return resultAction;
      // 임시;
      if (user.fetchStatus === "initial") {
        return dispatch(fetchUserById(userId));
      } else {
        return null;
      }
    },
    [dispatch, user],
  );

  return { user, onFetchUserById };
};

export default useReduxUser;
