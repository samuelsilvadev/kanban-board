import { combineReducers } from "redux";
import type { TaskModel } from "../types/task";
import { createSlice } from "@reduxjs/toolkit";

const initialTasksState: TaskModel[] = [];

const tasksSlice = createSlice({
  initialState: initialTasksState,
  name: "tasks",
  reducers: {},
});

export const rootReducer = combineReducers({
  tasks: tasksSlice.reducer,
});
