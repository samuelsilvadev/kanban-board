import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { selectActiveProjectId } from "../ui/tasks/selectors";
import { setCurrentProjectId } from "../ui/tasks/tasksUISlice";

export function useSelectedProject() {
  const selectedProjectId = useAppSelector(selectActiveProjectId);
  const dispatch = useAppDispatch();

  return {
    selectedProjectId,
    setProjectId: useCallback(
      (projectId: string) => {
        dispatch(setCurrentProjectId({ projectId }));
      },
      [dispatch]
    ),
  };
}
