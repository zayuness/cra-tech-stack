import { createAction, createReducer } from "typesafe-actions";
import produce from "immer";

/**
 * @url 공식문서: https://github.com/piotrwitek/typesafe-actions#reducers
 *
 * redux step
 * 1. declare action types
 * 2. declare action creater functions
 * 3. declare reducer function
 */

// 1. declare action type
const TEST = "TEST" as const;

// 2. declare action function
export const updateTest = createAction(
  /**
   * typesafe-actions v5 convention for FSA (but without error property)
   */
  TEST, //  action type
  // (args) => args, // payload creator
  // (args) => args, // meta creator
)();

// 3. declare reducer function
const initState = {
  testState: true,
};

export const testReducer = createReducer(initState).handleAction(
  updateTest,
  (state, action) =>
    produce(state, (draft) => {
      draft.testState = !state.testState;
    }),
);

const test = {
  testReducer,
  updateTest,
};
export default test;
