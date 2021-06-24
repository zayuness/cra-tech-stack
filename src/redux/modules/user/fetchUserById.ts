import { ActionType, createAsyncAction } from "typesafe-actions";
import { ThunkAction } from "redux-thunk";

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
export const fetchUserByIdAction = createAsyncAction(
  "user/fetchUserById/request",
  "user/fetchUserById/success",
  "user/fetchUserById/failure",
  "user/fetchUserById/cancel",
)<void, ReturnValue, UserError>();

//  2. decalre thunk
const fetchUserById =
  /**
   * @url 참고: https://redux.js.org/recipes/usage-with-typescript#type-checking-redux-thunks
   */


    (
      userId: UserId,
    ): ThunkAction<
      void,
      RootState,
      unknown,
      ActionType<typeof fetchUserByIdAction>
    > =>
    async (dispatch, getState) => {
      const { user } = getState();
      if (user.fetchStatus !== "initial") {
        return null;
      }
      const { request, success, failure } = fetchUserByIdAction;
      try {
        dispatch(request());
        const response = await fetch(`http://localhost:3004/users/${userId}`);
        const res = (await response.json()) as ReturnValue;
        dispatch(success(res));
        return res;
      } catch (error) {
        dispatch(failure(error.errorMessage));
        return error as UserError;
      }
    };

//  3. decalre reducer in ../user

export default fetchUserById;
