import { useCallback } from "react";
import type { TaskModel } from "../../types/task";
import { editTask } from "../tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { selectGroupedByStatusAndFilteredTasks } from "../projects/selectors";
import { selectIsTasksLoading, selectTasksError } from "../tasks/selectors";

export function useTasks() {
  const tasks = useAppSelector(selectGroupedByStatusAndFilteredTasks);
  const isLoading = useAppSelector(selectIsTasksLoading);
  const error = useAppSelector(selectTasksError);
  const dispatch = useAppDispatch();

  return {
    isLoading,
    error,
    tasks,
    editTask: useCallback(
      (id: string, fields: Partial<TaskModel>) =>
        dispatch(editTask({ id, fields })),
      [dispatch]
    ),
  };
}
