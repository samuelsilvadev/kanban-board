import { EndpointError } from "../../utils/EndpointError";
import type { RootState } from "../store";

export function selectIsTasksLoading(state: RootState): boolean {
  return state.tasks.loading;
}
export function selectTasksError(state: RootState): EndpointError | undefined {
  return state.tasks.error;
}

export function selectTaskById(state: RootState, taskId: string) {
  return state.tasks.data?.[taskId];
}

export function selectTasks(state: RootState) {
  return state.tasks.data;
}
