import { useCallback, useMemo } from "react";
import { getAuthToken, getAuthUrl, logout } from "../auth/authSlice";
import {
  selectAuthUrl,
  selectIsAuthLoading,
  selectAuthError,
  selectAuthUser,
  selectIsAuthUserLoaded,
} from "../auth/selectors";
import { useAppDispatch, useAppSelector } from "../store";

export function useAuth() {
  const dispatch = useAppDispatch();
  const authUrl = useAppSelector(selectAuthUrl);
  const user = useAppSelector(selectAuthUser);
  const isLoading = useAppSelector(selectIsAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthUserLoaded = useAppSelector(selectIsAuthUserLoaded);

  const _getAuthUrl = useCallback(() => dispatch(getAuthUrl()), [dispatch]);
  const _getAuthToken = useCallback(
    (authCode: string | null) => {
      if (!authCode) {
        // TODO: dispatch action with error
        return;
      }

      dispatch(getAuthToken(authCode));
    },
    [dispatch]
  );
  const _logout = useCallback(() => dispatch(logout()), [dispatch]);

  return useMemo(
    () => ({
      authUrl,
      user,
      isLoading,
      error,
      isAuthUserLoaded,
      getAuthUrl: _getAuthUrl,
      getAuthToken: _getAuthToken,
      logout: _logout,
    }),
    [
      authUrl,
      isLoading,
      error,
      user,
      isAuthUserLoaded,
      _getAuthToken,
      _getAuthUrl,
      _logout,
    ]
  );
}
