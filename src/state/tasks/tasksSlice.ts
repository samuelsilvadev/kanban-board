import type { TaskModel } from "../../types/task";
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialTasksState: TaskModel[] = [];

type TasksState = typeof initialTasksState;

const setTasksReducer: CaseReducer<TasksState, PayloadAction<TaskModel[]>> = (
  state,
  { payload }
) => {
  state.push(...payload);
};

const editTaskReducer: CaseReducer<
  TasksState,
  PayloadAction<{ id: string; fields: Partial<TaskModel> }>
> = (state, { payload: { id, fields } }) => {
  let taskIndex = state.findIndex((task) => task.id === id);

  if (taskIndex >= 0) {
    state[taskIndex] = { ...state[taskIndex], ...fields };
  }
};

const tasksSlice = createSlice({
  initialState: initialTasksState,
  name: "tasks",
  reducers: {
    setTasks: setTasksReducer,
    editTask: editTaskReducer,
  },
});

export const { setTasks, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;
