import { createSelector } from "@reduxjs/toolkit";
import type { ErrorMessage } from "../../types/error";
import { ProjectView } from "../../types/project";
import { Statuses, TaskView } from "../../types/task";
import type { RootState } from "../store";
import { selectTaskById } from "../tasks/selectors";
import { selectActiveProjectId, selectSearchTerm } from "../ui/tasks/selectors";

export function _selectProjects(state: RootState): ProjectView[] {
  return Object.values(state.projects.data ?? {});
}

export const selectProjects = createSelector(
  _selectProjects,
  (projects) => projects
);

export function selectActiveProject(state: RootState) {
  const currentSelectedProjectId = selectActiveProjectId(state);
  const projects = state.projects.data;

  if (
    !projects ||
    !currentSelectedProjectId ||
    !projects[currentSelectedProjectId]
  ) {
    return null;
  }

  const project = projects[currentSelectedProjectId];

  return {
    ...project,
    tasks: project.tasks.map((taskId) => selectTaskById(state, taskId)),
  };
}

export const selectGroupedByStatusAndFilteredTasks = createSelector(
  [selectActiveProject, selectSearchTerm],
  (project, searchTerm) => {
    const initialGroupedTasks: Record<Statuses, TaskView[]> = {
      OPEN: [],
      IN_PROGRESS: [],
      DONE: [],
    };

    return (
      project?.tasks
        .filter((task): task is TaskView => Boolean(task))
        .filter((task) => task.title.match(new RegExp(searchTerm, "i")))
        .reduce<Record<Statuses, TaskView[]>>((groupedTasks, task) => {
          groupedTasks[task.status].push(task);

          return groupedTasks;
        }, initialGroupedTasks) ?? initialGroupedTasks
    );
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
