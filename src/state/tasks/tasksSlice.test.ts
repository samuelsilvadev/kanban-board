import tasksReducer, { initialTasksState } from "./tasksSlice";

describe("reducers - task reducer", () => {
  it("should return the initial state", () => {
    expect(tasksReducer(undefined, { type: "RANDOM_ACTION" })).toEqual(
      initialTasksState
    );
  });
});
