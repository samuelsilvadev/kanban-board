import { rootReducer } from "../rootReducer";
import { initialTasksState } from "../tasks/tasksSlice";

describe("reducers - root reducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, { type: "RANDOM_ACTION" })).toEqual({
      tasks: initialTasksState,
    });
  });
});
