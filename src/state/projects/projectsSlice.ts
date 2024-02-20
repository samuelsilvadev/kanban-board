import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NormalizedSchema } from "normalizr";
import { ProjectView } from "../../types/project";
import { RawTaskModel, TaskModel } from "../../types/task";
import { ENDPOINTS } from "../../utils/api";
import { EndpointError } from "../../utils/EndpointError";
import {
  ApiCallAction,
  API_CALL_ACTION_TYPE,
  getApiActions,
} from "../middlewares/api";
import { createTaskApiActions } from "../tasks/tasksSlice";

export type GetProjectsSuccessAction = PayloadAction<
  NormalizedSchema<
    {
      tasks: Record<string, RawTaskModel>;
      projects: Record<string, ProjectView>;
    },
    string[]
  >
>;

export type ProjectsState = {
  data: Record<string, ProjectView> | null;
  loading: boolean;
  error?: EndpointError;
};

export const initialProjectsState: ProjectsState = {
  data: null,
  loading: false,
};

const projectsSlice = createSlice({
  initialState: initialProjectsState,
  name: "projects",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectsApiActions.start, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(
      getProjectsApiActions.failure,
      (state, { payload }: PayloadAction<EndpointError>) => {
        state.loading = false;
        state.error = payload;
      }
    );
    builder.addCase(
      getProjectsApiActions.success,
      (state, { payload }: GetProjectsSuccessAction) => {
        state.loading = false;
        state.error = undefined;

        if (!payload.entities.projects) {
          return;
        }

        state.data = payload.entities.projects;
      }
    );
    builder.addCase(
      createTaskApiActions.success,
      (state, { payload }: PayloadAction<TaskModel>) => {
        if (!state.data) {
          return;
        }

        state.data[payload.projectId].tasks.push(payload.id);
      }
    );
  },
});

enum Entities {
  GET_PROJECTS = "GET_PROJECTS",
}

export const getProjectsApiActions = getApiActions(Entities.GET_PROJECTS);

export const getProjects = (): ApiCallAction => {
  return {
    type: API_CALL_ACTION_TYPE,
    payload: {
      url: ENDPOINTS.GET_PROJECTS,
      entity: Entities.GET_PROJECTS,
      schema: "projects",
      options: {
        credentials: "include",
      },
    },
  };
};

export default projectsSlice.reducer;
