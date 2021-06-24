import { createAsyncAction } from "typesafe-actions";
import { call, put } from "redux-saga/effects";

/**
 * @url 참고 https://react.vlpt.us/using-typescript/06-ts-redux-middleware.html
 */

interface ReturnValue {
  id: string;
  name: string;
}

interface UserError {
  errorMessage: string;
}

type UserId = number;

//  1. declare async action types and async action creator function
/**
 * request action의 인자를 UserId로 설정한  것은, 나중에 rootSaga에 등록할 때,
 * fetchUserByIdAction.request와 saga인 fetchUserById를 takeEvery()에 등록하기 때문이다.
 * 이는 typesafe-actions 공식문서의 convention이다.
 *
 * 따라서 fetchUserByIdAction.request의 action을 saga 함수에서 인자로 받아서 나머지 작업을
 * 처리하게 된다.
 */
export const fetchUserByIdAction = createAsyncAction(
  "user/fetchUserById/request",
  "user/fetchUserById/success",
  "user/fetchUserById/failure",
  "user/fetchUserById/cancel",
)<UserId, ReturnValue, UserError, void>();

//  2. declare fetch api

function* fetchUserById_api(userId: UserId) {
  const response = (yield fetch(
    `http://localhost:3004/users/${userId}`,
  )) as Response;
  return (yield response.json()) as ReturnValue;
}

// 이는 다음 async function과 동일하게 기능한다.

// const fetchUserById_api = async (userId: UserId) => {
//   const response = await fetch(`http://localhost:3004/users/${userId}`);
//   return (await response.json()) as ReturnValue;
// };

//  3. declare saga

function* fetchUserByIdSaga(
  action: ReturnType<typeof fetchUserByIdAction.request>,
): Generator {
  try {
    const user = (yield call(fetchUserById_api, action.payload)) as ReturnValue;
    yield put(fetchUserByIdAction.success(user));
  } catch (error) {
    yield put(fetchUserByIdAction.failure(error));
  }
  return () => put(fetchUserByIdAction.cancel()); // saga가 cancel되면 실행된다.
}

export default fetchUserByIdSaga;
