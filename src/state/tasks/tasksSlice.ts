import type { ErrorMessage } from "../../types/error";
import type { CreateTaskBody, TaskView, TaskModel } from "../../types/task";
import {
  PayloadAction,
  createSlice,
  AnyAction,
  createAction,
  CaseReducer,
} from "@reduxjs/toolkit";
import {
  ApiCallAction,
  API_CALL_ACTION_TYPE,
  getApiActions,
} from "../middlewares/api";
import { ENDPOINTS } from "../../utils/api";
import { toTaskView } from "../../mappers/toTaskModel";

export type TasksState = {
  data: TaskView[] | null;
  loading: boolean;
  error?: ErrorMessage;
  searchTerm: string;
};

export type EditTaskAction = PayloadAction<{
  id: string;
  fields: Partial<TaskModel>;
}>;

export type IncrementTimerAction = PayloadAction<{ id: string }>;

export type SetSearchTermAction = PayloadAction<{ searchTerm: string }>;

export const initialTasksState: TasksState = {
  data: null,
  loading: false,
  searchTerm: "",
};

const incrementTimerReducer: CaseReducer<TasksState, IncrementTimerAction> = (
  state,
  { payload: { id } }
) => {
  const task = state.data?.find((task) => task.id === id);

  if (task) {
    task.timerSpend += 1;
  }
};

const setSearchTermReducer: CaseReducer<TasksState, SetSearchTermAction> = (
  state,
  { payload: { searchTerm } }
) => {
  state.searchTerm = searchTerm;
};

const tasksSlice = createSlice({
  initialState: initialTasksState,
  name: "tasks",
  reducers: {
    setSearchTerm: setSearchTermReducer,
    incrementTimer: incrementTimerReducer,
  },
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
          state.data[taskIndex] = {
            ...payload,
            timerSpend: state.data[taskIndex].timerSpend || 0,
          };
        }
      }
    );
    builder.addCase(
      getTasksApiActions.success,
      (state, { payload }: PayloadAction<TaskModel[]>) => {
        state.loading = false;
        state.data = payload.map(toTaskView);
      }
    );
    builder.addCase(
      createTaskApiActions.success,
      (state, { payload }: PayloadAction<TaskModel>) => {
        state.loading = false;
        state.error = undefined;
        state.data?.push(toTaskView(payload));
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

export const { incrementTimer, setSearchTerm } = tasksSlice.actions;

export const startTimer = createAction<IncrementTimerAction["payload"]>(
  `${tasksSlice.name}/startTimer`
);
export const stopTimer = createAction<IncrementTimerAction["payload"]>(
  `${tasksSlice.name}/stopTimer`
);

export default tasksSlice.reducer;
