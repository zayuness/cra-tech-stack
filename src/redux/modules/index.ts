import test, { testReducer, updateTest } from "./test";
import user, {
  userReducer,
  fetchUserByIdSaga,
  fetchUserByIdAction,
} from "./user";

export const reducers = { test: testReducer, user: userReducer };

/**
 * action type 등록을 위한 export
 * uses in "@redux/store"
 */
export const actions = {
  test_updateTest: updateTest,
  user_fetchUserByIdAction_request: fetchUserByIdAction.request,
  user_fetchUserByIdAction_success: fetchUserByIdAction.success,
  user_fetchUserByIdAction_failure: fetchUserByIdAction.failure,
  user_fetchUserByIdAction_cancel: fetchUserByIdAction.cancel,
};

/**
 * uses in component
 */
export { updateTest };
export const fetchUserById = fetchUserByIdAction.request;

export const sagas = { fetchUserById, fetchUserByIdSaga };

const containers = {
  test,
  user,
};
export default containers;
