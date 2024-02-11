import type { ErrorMessage } from "../../types/error";
import type { RootState } from "../store";

export function selectIsTasksLoading(state: RootState): boolean {
  return state.tasks.loading;
}
export function selectTasksError(state: RootState): ErrorMessage | undefined {
  return state.tasks.error;
}

export function selectTaskById(state: RootState, taskId: string) {
  return state.tasks.data?.[taskId];
}
