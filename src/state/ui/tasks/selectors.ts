import { RootState } from "../../store";

export function selectSearchTerm(state: RootState): string {
  return state.ui.tasks.searchTerm;
}

export function selectActiveProjectId(state: RootState): string | null {
  return state.ui.tasks.currentProjectId;
}
