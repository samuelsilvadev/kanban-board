import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { selectSearchTerm } from "./selectors";
import { setSearchTerm } from "./tasksSlice";

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
