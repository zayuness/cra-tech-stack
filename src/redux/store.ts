import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ActionType } from "typesafe-actions";

import rootReducer from "./rootReducer";
import { actions } from "./modules";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

declare global {
  type RootState = ReturnType<typeof store.getState>;
}

declare module "typesafe-actions" {
  interface Types {
    RootAction: ActionType<typeof actions>;
  }
}

export default store;
