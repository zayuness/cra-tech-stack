import test, { testReducer, updateTest } from "./test";
import user, { userReducer, fetchUserById, fetchUserByIdAction } from "./user";

export const reducers = { test: testReducer, user: userReducer };

export const actions = {
  updateTest,
  ...fetchUserByIdAction,
};

export const thunks = { fetchUserById };

const containers = {
  test,
  user,
};
export default containers;
