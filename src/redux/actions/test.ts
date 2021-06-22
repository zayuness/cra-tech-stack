interface InitState {
  testState: boolean;
}

type TestAction = ReturnType<typeof updateTest>;

/**
 * redux step
 * 1. declare action types
 * 2. declare action creater functions
 * 3. declare reducer function
 */

const TEST = "TEST" as const;

export const updateTest = () => ({ type: TEST });
// you can also get arguments from action and put it in return value.

const initState: InitState = {
  testState: true,
};

const testReducer = (state = initState, action: TestAction) => {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        testState: !state.testState,
      };
    default:
      return state;
  }
};

export default testReducer;
