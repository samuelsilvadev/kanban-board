import { rootReducer } from "../rootReducer";
import { initialTasksState } from "../tasks/tasksSlice";
import { initialProjectsState } from "../projects/projectsSlice";
import { initialTasksUIState } from "../ui/tasks/tasksUISlice";

describe("reducers - root reducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, { type: "RANDOM_ACTION" })).toEqual({
      tasks: initialTasksState,
      projects: initialProjectsState,
      ui: {
        tasks: initialTasksUIState,
      },
    });
  });
});
