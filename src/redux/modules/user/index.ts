import { createReducer } from "typesafe-actions";
import produce from "immer";

import fetchUserById, { fetchUserByIdAction } from "./fetchUserById";

export { fetchUserById, fetchUserByIdAction };

const userState = {
  fetchStatus: "initial",
  validated: false,
  error: false,
  errorMessage: "",
  id: "",
  name: "",
};

export const userReducer = createReducer(userState)
  // fetchUserById
  .handleAction(fetchUserByIdAction.request, (state, action) =>
    produce(state, (draft) => {
      draft.fetchStatus = "pending";
    }),
  )
  .handleAction(fetchUserByIdAction.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.fetchStatus = "fulfilled";
      draft.validated = true;
      draft.id = payload.id;
      draft.name = payload.name;
    }),
  )
  .handleAction(fetchUserByIdAction.failure, (state, { payload }) =>
    produce(state, (draft) => {
      draft.fetchStatus = "rejected";
      draft.error = true;
      draft.errorMessage = payload.errorMessage;
    }),
  )
  .handleAction(fetchUserByIdAction.cancel, (state, action) =>
    produce(state, (draft) => {
      draft.fetchStatus = "canceled";
    }),
  );

const user = {
  userReducer,
  fetchUserById,
  fetchUserByIdAction,
};
export default user;
