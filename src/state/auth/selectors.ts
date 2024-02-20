import { UserModel } from "../../types/auth";
import { EndpointError } from "../../utils/EndpointError";
import { RootState } from "../store";

export function selectAuthUrl(state: RootState): string | null {
  return state.auth.authUrl;
}

export function selectAuthUser(state: RootState): UserModel | null {
  return state.auth.user;
}

export function selectIsAuthUserLoaded(state: RootState): boolean {
  return !selectIsAuthLoading(state) && selectAuthUser(state) !== null;
}

export function selectIsAuthLoading(state: RootState): boolean {
  return state.auth.loading;
}

export function selectAuthError(state: RootState): EndpointError | undefined {
  return state.auth.error;
}
