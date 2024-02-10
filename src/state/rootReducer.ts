import { combineReducers } from "redux";
import tasksReducer from "./tasks/tasksSlice";
import { rootUIReducer } from "./ui/rootUIReducer";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  ui: rootUIReducer,
});
