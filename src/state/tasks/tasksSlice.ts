import { tasksClient } from "../../clients/tasks";
import type { ErrorMessage } from "../../types/error";
import type { TaskModel } from "../../types/task";
import {
  CaseReducer,
  Dispatch,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";

export type TasksState = {
  data: TaskModel[] | null;
  loading: boolean;
  error?: ErrorMessage;
};

export const initialTasksState: TasksState = {
  data: null,
  loading: false,
};

const editTaskReducer: CaseReducer<
  TasksState,
  PayloadAction<{ id: string; fields: Partial<TaskModel> }>
> = (state, { payload: { id, fields } }) => {
  const tasks = state.data;

  if (!tasks) {
    return;
  }

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex >= 0) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...fields };
  }
};

const tasksSlice = createSlice({
  initialState: initialTasksState,
  name: "tasks",
  reducers: {
    editTask: editTaskReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(getTasksSteps.start, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      getTasksSteps.success,
      (state, { payload: { tasks } }: GetTasksActions["Success"]) => {
        state.loading = false;
        state.data = tasks;
      }
    );
    builder.addCase(
      getTasksSteps.error,
      (state, { payload: { error } }: GetTasksActions["Error"]) => {
        state.loading = false;
        state.error = error;
      }
    );
  },
});

export const { editTask } = tasksSlice.actions;

const getTasksSteps = {
  start: `${tasksSlice.name}/getTasks/start`,
  success: `${tasksSlice.name}/getTasks/success`,
  error: `${tasksSlice.name}/getTasks/error`,
};

interface GetTasksActions {
  Start: ReturnType<typeof startGetTasks>;
  Success: ReturnType<typeof successGetTasks>;
  Error: ReturnType<typeof errorGetTasks>;
}

const startGetTasks = () => ({ type: getTasksSteps.start } as const);

const successGetTasks = (tasks: TaskModel[]) =>
  ({
    type: getTasksSteps.success,
    payload: { tasks },
  } as const);

const errorGetTasks = (originalError: Error) => {
  const error: ErrorMessage = {
    message: originalError.message,
  };

  return {
    type: getTasksSteps.error,
    payload: { error },
  } as const;
};

export const getTasks = () => {
  return async (dispatch: Dispatch) => {
    dispatch(startGetTasks());

    const response = await tasksClient.getAll();

    dispatch(
      response instanceof Error
        ? errorGetTasks(response)
        : successGetTasks(response)
    );
  };
};

export default tasksSlice.reducer;
