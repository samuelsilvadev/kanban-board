import { rootReducer } from "../rootReducer";
import { initialTasksState } from "../tasks/tasksSlice";
import { initialTasksUIState } from "../ui/tasks/tasksUISlice";

describe("reducers - root reducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, { type: "RANDOM_ACTION" })).toEqual({
      tasks: initialTasksState,
      ui: {
        tasks: initialTasksUIState,
      },
    });
  });
});
