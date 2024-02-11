import {
  selectIsProjectsLoaded,
  selectIsProjectsLoading,
  selectProjects,
  selectProjectsError,
} from "../projects/selectors";
import { useCallback } from "react";
import { getProjects } from "../projects/projectsSlice";
import { useAppDispatch, useAppSelector } from "../store";

export function useProjects() {
  const projects = useAppSelector(selectProjects);
  const isLoading = useAppSelector(selectIsProjectsLoading);
  const isLoaded = useAppSelector(selectIsProjectsLoaded);
  const error = useAppSelector(selectProjectsError);
  const dispatch = useAppDispatch();

  return {
    error,
    isLoaded,
    isLoading,
    projects,
    getProjects: useCallback(() => dispatch(getProjects()), [dispatch]),
  };
}
