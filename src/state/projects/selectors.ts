import { createSelector } from "@reduxjs/toolkit";
import type { ErrorMessage } from "../../types/error";
import { ProjectView } from "../../types/project";
import { Statuses, TaskView } from "../../types/task";
import type { RootState } from "../store";
import { selectTasks } from "../tasks/selectors";
import { selectActiveProjectId, selectSearchTerm } from "../ui/tasks/selectors";

export function _selectProjects(
  state: RootState
): Record<string, ProjectView> | null {
  return state.projects.data;
}

export const selectProjects = createSelector(_selectProjects, (projects) =>
  Object.values(projects ?? {})
);

export function selectActiveProject(state: RootState) {
  const currentSelectedProjectId = selectActiveProjectId(state);
  const projects = _selectProjects(state);

  if (
    !projects ||
    !currentSelectedProjectId ||
    !projects[currentSelectedProjectId]
  ) {
    return null;
  }

  return projects[currentSelectedProjectId];
}

export const selectGroupedByStatusAndFilteredTasks = createSelector(
  [selectActiveProject, selectSearchTerm, selectTasks],
  (project, searchTerm, tasks) => {
    const initialGroupedTasks: Record<Statuses, TaskView[]> = {
      OPEN: [],
      IN_PROGRESS: [],
      DONE: [],
    };

    if (!project) {
      return initialGroupedTasks;
    }

    return project.tasks
      .map((taskId) => tasks?.[taskId])
      .filter((task): task is TaskView => Boolean(task))
      .filter((task) => task.title.match(new RegExp(searchTerm, "i")))
      .reduce<Record<Statuses, TaskView[]>>((groupedTasks, task) => {
        groupedTasks[task.status].push(task);

        return groupedTasks;
      }, initialGroupedTasks);
  }
);

export function selectIsProjectsLoading(state: RootState): boolean {
  return state.projects.loading;
}

export function selectIsProjectsLoaded(state: RootState): boolean {
  return !selectIsProjectsLoading(state) && state.projects.data !== null;
}

export function selectProjectsError(
  state: RootState
): ErrorMessage | undefined {
  return state.projects.error;
}
