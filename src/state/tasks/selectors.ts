import type { TaskModel } from "../../types/task";
import type { RootState } from "../store";

export function selectTasks(state: RootState): TaskModel[] {
  return state.tasks;
}
