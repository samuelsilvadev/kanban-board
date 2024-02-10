import {
  selectGroupedByStatusAndFilteredTasks,
  selectIsTasksLoaded,
  selectIsTasksLoading,
  selectTasksError,
} from "../tasks/selectors";
import { useCallback } from "react";
import type { TaskModel } from "../../types/task";
import { editTask, getTasks } from "../tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "../store";

export function useTasks() {
  const tasks = useAppSelector(selectGroupedByStatusAndFilteredTasks);
  const isLoading = useAppSelector(selectIsTasksLoading);
  const isLoaded = useAppSelector(selectIsTasksLoaded);
  const error = useAppSelector(selectTasksError);
  const dispatch = useAppDispatch();

  return {
    error,
    isLoaded,
    isLoading,
    tasks,
    getTasks: useCallback(() => dispatch(getTasks()), [dispatch]),
    editTask: useCallback(
      (id: string, fields: Partial<TaskModel>) =>
        dispatch(editTask({ id, fields })),
      [dispatch]
    ),
  };
}
