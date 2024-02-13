import { useMemo } from "react";
import { useAppSelector } from "../store";
import { selectGroupedByStatusAndFilteredTasks } from "../projects/selectors";

export function useTasksData() {
  const tasks = useAppSelector(selectGroupedByStatusAndFilteredTasks);

  return useMemo(() => ({ tasks }), [tasks]);
}
