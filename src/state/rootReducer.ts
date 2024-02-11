import { combineReducers } from "redux";
import tasksReducer from "./tasks/tasksSlice";
import projectsReducer from "./projects/projectsSlice";
import { rootUIReducer } from "./ui/rootUIReducer";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  projects: projectsReducer,
  ui: rootUIReducer,
});
