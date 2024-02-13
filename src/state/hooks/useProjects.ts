import {
  selectIsProjectsLoaded,
  selectIsProjectsLoading,
  selectProjects,
  selectProjectsError,
} from "../projects/selectors";
import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { getProjects } from "../projects/projectsSlice";

export function useProjects() {
  const projects = useAppSelector(selectProjects);
  const isLoading = useAppSelector(selectIsProjectsLoading);
  const isLoaded = useAppSelector(selectIsProjectsLoaded);
  const error = useAppSelector(selectProjectsError);
  const dispatch = useAppDispatch();

  const _getProjects = useCallback(() => dispatch(getProjects()), [dispatch]);

  return useMemo(
    () => ({
      error,
      isLoaded,
      isLoading,
      projects,
      getProjects: _getProjects,
    }),
    [_getProjects, error, isLoaded, isLoading, projects]
  );
}
