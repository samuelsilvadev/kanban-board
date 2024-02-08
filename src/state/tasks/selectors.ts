import { createSelector } from "@reduxjs/toolkit";
import type { ErrorMessage } from "../../types/error";
import type { TaskView } from "../../types/task";
import type { RootState } from "../store";

function _selectTasks(state: RootState): TaskView[] {
  return state.tasks.data ?? [];
}

export const selectTasks = createSelector(
  [_selectTasks, selectQuery],
  (tasks, query) =>
    tasks.filter((task) => task.title.match(new RegExp(query, "i")))
);

export function selectQuery(state: RootState): string {
  return state.tasks.query;
}

export function selectIsTasksLoading(state: RootState): boolean {
  return state.tasks.loading;
}

export function selectIsTasksLoaded(state: RootState): boolean {
  return !selectIsTasksLoading(state) && state.tasks.data !== null;
}

export function selectTasksError(state: RootState): ErrorMessage | undefined {
  return state.tasks.error;
}

export function selectTaskById(state: RootState, taskId: string) {
  return selectTasks(state).find((task) => task.id === taskId);
}
