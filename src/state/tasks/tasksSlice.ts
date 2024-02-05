import type { ErrorMessage } from "../../types/error";
import type { CreateTaskBody, TaskModel } from "../../types/task";
import {
  PayloadAction,
  createSlice,
  AnyAction,
  createAction,
} from "@reduxjs/toolkit";
import {
  ApiCallAction,
  API_CALL_ACTION_TYPE,
  getApiActions,
} from "../middlewares/api";
import { ENDPOINTS } from "../../utils/api";

export type TasksState = {
  data: TaskModel[] | null;
  loading: boolean;
  error?: ErrorMessage;
};

export type EditTaskAction = PayloadAction<{
  id: string;
  fields: Partial<TaskModel>;
}>;

export const initialTasksState: TasksState = {
  data: null,
  loading: false,
};

const tasksSlice = createSlice({
  initialState: initialTasksState,
  name: "tasks",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      editTasksApiActions.success,
      (state, { payload }: PayloadAction<TaskModel>) => {
        state.loading = false;

        if (!state.data) {
          return;
        }

        const taskIndex =
          state.data.findIndex((task) => task.id === payload.id) ?? -1;

        if (taskIndex >= 0) {
          state.data[taskIndex] = payload;
        }
      }
    );
    builder.addCase(
      getTasksApiActions.success,
      (state, { payload }: PayloadAction<TaskModel[]>) => {
        state.loading = false;
        state.data = payload;
      }
    );
    builder.addCase(
      createTaskApiActions.success,
      (state, { payload }: PayloadAction<TaskModel>) => {
        state.loading = false;
        state.error = undefined;
        state.data?.push(payload);
      }
    );
    builder.addMatcher(
      (action: AnyAction) =>
        [
          getTasksApiActions.start,
          createTaskApiActions.start,
          editTasksApiActions.start,
        ].includes(action.type),
      (state) => {
        state.loading = true;
        state.error = undefined;
      }
    );
    builder.addMatcher(
      (action: AnyAction) =>
        [
          getTasksApiActions.failure,
          createTaskApiActions.failure,
          editTasksApiActions.failure,
        ].includes(action.type),
      (state, { payload }: PayloadAction<ErrorMessage>) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

enum Entities {
  GET_TASKS = "GET_TASKS",
  CREATE_TASK = "CREATE_TASK",
  EDIT_TASK = "EDIT_TASK",
}

export const createTaskApiActions = getApiActions(Entities.CREATE_TASK);
export const getTasksApiActions = getApiActions(Entities.GET_TASKS);
export const editTasksApiActions = getApiActions(Entities.EDIT_TASK);

export const editTask = createAction<
  EditTaskAction["payload"],
  typeof editTasksApiActions.start
>(editTasksApiActions.start);

export const getTasks = (): ApiCallAction => {
  return {
    type: API_CALL_ACTION_TYPE,
    payload: {
      url: ENDPOINTS.GET_TASKS,
      entity: Entities.GET_TASKS,
    },
  };
};

export const createTask = (
  body: Omit<CreateTaskBody, "status">
): ApiCallAction => {
  return {
    type: API_CALL_ACTION_TYPE,
    payload: {
      url: ENDPOINTS.CREATE_TASK,
      entity: Entities.CREATE_TASK,
      options: {
        method: "POST",
        body: JSON.stringify({ ...body, status: "OPEN" }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    },
  };
};

export default tasksSlice.reducer;
