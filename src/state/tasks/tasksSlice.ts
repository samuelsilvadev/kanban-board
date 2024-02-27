/* eslint-disable unused-imports/no-unused-vars */
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
import { toTaskModel, toTaskView } from "../../mappers/toTaskModel";
import {
  getProjectsApiActions,
  GetProjectsSuccessAction,
} from "../projects/projectsSlice";
import { EndpointError } from "../../utils/EndpointError";

export type TasksState = {
  data: Record<string, TaskView> | null;
  loading: boolean;
  error?: EndpointError;
};

export type EditTaskAction = PayloadAction<{
  id: string;
  fields: Partial<TaskModel>;
}>;

export type IncrementTimerAction = PayloadAction<{ id: string }>;

export const initialTasksState: TasksState = {
  data: null,
  loading: false,
};

const incrementTimerReducer: CaseReducer<TasksState, IncrementTimerAction> = (
  state,
  { payload: { id } }
) => {
  const task = state.data?.[id];

  if (task) {
    task.timerSpend += 1;
  }
};

const tasksSlice = createSlice({
  initialState: initialTasksState,
  name: "tasks",
  reducers: {
    incrementTimer: incrementTimerReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(
      editTasksApiActions.success,
      (state, { payload }: PayloadAction<TaskModel>) => {
        state.loading = false;

        if (!state.data) {
          state.data = {};
        }

        state.data[payload.id] = {
          ...payload,
          timerSpend: state.data[payload.id].timerSpend || 0,
        };
      }
    );
    builder.addCase(
      getProjectsApiActions.success,
      (state, { payload }: GetProjectsSuccessAction) => {
        state.loading = false;

        if (!payload.entities.tasks) {
          return;
        }

        state.data = Object.entries(payload.entities.tasks).reduce<
          Record<string, TaskView>
        >((combinedTasks, [id, task]) => {
          combinedTasks[id] = toTaskView(toTaskModel(task));

          return combinedTasks;
        }, {});
      }
    );
    builder.addCase(
      createTaskApiActions.success,
      (state, { payload }: PayloadAction<TaskModel>) => {
        state.loading = false;
        state.error = undefined;

        if (!state.data) {
          state.data = {};
        }

        state.data[payload.id] = toTaskView(payload);
      }
    );
    builder.addMatcher(
      (action: AnyAction) =>
        [createTaskApiActions.start, editTasksApiActions.start].includes(
          action.type
        ),
      (state) => {
        state.loading = true;
        state.error = undefined;
      }
    );
    builder.addMatcher(
      (action: AnyAction) =>
        [createTaskApiActions.failure, editTasksApiActions.failure].includes(
          action.type
        ),
      (state, { payload }: PayloadAction<EndpointError>) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

enum Entities {
  CREATE_TASK = "CREATE_TASK",
  EDIT_TASK = "EDIT_TASK",
}

export const createTaskApiActions = getApiActions(Entities.CREATE_TASK);
export const editTasksApiActions = getApiActions(Entities.EDIT_TASK);

export const editTask = createAction<
  EditTaskAction["payload"],
  typeof editTasksApiActions.start
>(editTasksApiActions.start);

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
        credentials: "include",
      },
    },
  };
};

export const { incrementTimer } = tasksSlice.actions;

export const startTimer = createAction<IncrementTimerAction["payload"]>(
  `${tasksSlice.name}/startTimer`
);
export const stopTimer = createAction<IncrementTimerAction["payload"]>(
  `${tasksSlice.name}/stopTimer`
);

export default tasksSlice.reducer;
