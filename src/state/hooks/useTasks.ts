import { useCallback, useMemo } from "react";
import type { TaskModel } from "../../types/task";
import { editTask } from "../tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { selectIsTasksLoading, selectTasksError } from "../tasks/selectors";

export function useTasks() {
  const isLoading = useAppSelector(selectIsTasksLoading);
  const error = useAppSelector(selectTasksError);
  const dispatch = useAppDispatch();

  const _editTask = useCallback(
    (id: string, fields: Partial<TaskModel>) =>
      dispatch(editTask({ id, fields })),
    [dispatch]
  );

  return useMemo(
    () => ({
      isLoading,
      error,
      editTask: _editTask,
    }),
    [isLoading, error, _editTask]
  );
}
