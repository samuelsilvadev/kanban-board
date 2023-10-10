import { useDispatch, useSelector } from "react-redux";
import { selectTasks } from "./selectors";
import { useCallback } from "react";
import type { TaskModel } from "../../types/task";
import { editTask, setTasks } from "./tasksSlice";

export function useTasks() {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  return {
    tasks,
    setTasks: useCallback(
      (tasks: TaskModel[]) => dispatch(setTasks(tasks)),
      [dispatch]
    ),
    editTask: useCallback(
      (id: string, fields: Partial<TaskModel>) =>
        dispatch(editTask({ id, fields })),
      [dispatch]
    ),
  };
}
