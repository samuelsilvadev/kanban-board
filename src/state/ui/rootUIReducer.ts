import { combineReducers } from "redux";
import tasksUIReducer from "./tasks/tasksUISlice";

export const rootUIReducer = combineReducers({
  tasks: tasksUIReducer,
});
