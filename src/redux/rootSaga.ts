import { all, takeEvery } from "redux-saga/effects";

import * as modules from "./modules";

/**
 * @url 참고: https://redux-saga.js.org/docs/advanced/RootSaga
 */

const { fetchUserById, fetchUserByIdSaga } = modules.sagas;

export default function* rootSaga() {
  yield all([takeEvery(fetchUserById, fetchUserByIdSaga)]);
}
