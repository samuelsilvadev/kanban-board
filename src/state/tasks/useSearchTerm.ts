import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { selectQuery } from "./selectors";
import { setSearchTerm } from "./tasksSlice";

export function useSearchTerm() {
  const query = useAppSelector(selectQuery);
  const dispatch = useAppDispatch();

  return {
    query,
    setSearchTerm: useCallback(
      (query: string) => {
        dispatch(setSearchTerm({ query }));
      },
      [dispatch]
    ),
  };
}
