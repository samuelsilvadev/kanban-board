import { RootState } from "../../store";

export function selectSearchTerm(state: RootState): string {
  return state.ui.tasks.searchTerm;
}
