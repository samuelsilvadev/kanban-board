import { combineReducers } from "redux";
import tasksReducer from "./tasks/tasksSlice";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
});
