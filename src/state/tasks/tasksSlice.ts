import type { ErrorMessage } from "../../types/error";
import type { CreateTaskBody, TaskModel } from "../../types/task";
import {
  CaseReducer,
  PayloadAction,
  createSlice,
  AnyAction,
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
    builder.addCase(
      getTasksApiActions.success,
      (state, { payload }: PayloadAction<TaskModel[]>) => {
        state.loading = false;
        state.data = payload;
      }
    );
    builder.addCase(
      getTasksApiActions.failure,
      (state, { payload }: PayloadAction<ErrorMessage>) => {
        state.loading = false;
        state.error = payload;
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
    builder.addCase(
      createTaskApiActions.failure,
      (state, { payload }: PayloadAction<ErrorMessage>) => {
        state.loading = false;
        state.error = payload;
      }
    );
    builder.addMatcher(
      (action: AnyAction) =>
        [getTasksApiActions.start, createTaskApiActions.start].includes(
          action.type
        ),
      (state) => {
        state.loading = true;
        state.error = undefined;
      }
    );
  },
});

export const { editTask } = tasksSlice.actions;

enum Entities {
  GET_TASKS = "GET_TASKS",
  CREATE_TASK = "CREATE_TASK",
}

const createTaskApiActions = getApiActions(Entities.CREATE_TASK);
const getTasksApiActions = getApiActions(Entities.GET_TASKS);

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
