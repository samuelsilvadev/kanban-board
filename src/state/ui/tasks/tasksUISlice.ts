import { PayloadAction, createSlice, CaseReducer } from "@reduxjs/toolkit";
import {
  getProjectsApiActions,
  GetProjectsSuccessAction,
} from "../../projects/projectsSlice";

export type TasksUIState = {
  currentProjectId: string | null;
  searchTerm: string;
};

export type SetSearchTermAction = PayloadAction<{ searchTerm: string }>;

export type SetCurrentProjectIdAction = PayloadAction<{
  projectId: string;
}>;

export const initialTasksUIState: TasksUIState = {
  currentProjectId: null,
  searchTerm: "",
};

const setSearchTermReducer: CaseReducer<TasksUIState, SetSearchTermAction> = (
  state,
  { payload: { searchTerm } }
) => {
  state.searchTerm = searchTerm;
};

const setCurrentProjectReducer: CaseReducer<
  TasksUIState,
  SetCurrentProjectIdAction
> = (state, { payload: { projectId } }) => {
  state.currentProjectId = projectId;
};

const tasksUISlice = createSlice({
  initialState: initialTasksUIState,
  name: "ui/tasks",
  reducers: {
    setSearchTerm: setSearchTermReducer,
    setCurrentProjectId: setCurrentProjectReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(
      getProjectsApiActions.success,
      (state, { payload }: GetProjectsSuccessAction) => {
        state.currentProjectId = payload.result[0];
      }
    );
  },
});

export const { setCurrentProjectId, setSearchTerm } = tasksUISlice.actions;

export default tasksUISlice.reducer;
