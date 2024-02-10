import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { selectSearchTerm } from "../ui/tasks/selectors";
import { setSearchTerm } from "../ui/tasks/tasksUISlice";

export function useSearchTerm() {
  const searchTerm = useAppSelector(selectSearchTerm);
  const dispatch = useAppDispatch();

  return {
    searchTerm,
    setSearchTerm: useCallback(
      (searchTerm: string) => {
        dispatch(setSearchTerm({ searchTerm }));
      },
      [dispatch]
    ),
  };
}
