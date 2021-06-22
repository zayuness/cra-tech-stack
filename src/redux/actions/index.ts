import { combineReducers } from "redux";

import test from "./test";

const rootReducer = combineReducers({
  test,
});

export default rootReducer;

declare global {
  type RootState = ReturnType<typeof rootReducer>;
}
