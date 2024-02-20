import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux-saga";
import { AuthUrlModel, AuthUserModel, UserModel } from "../../types/auth";
import { ENDPOINTS } from "../../utils/api";
import { EndpointError } from "../../utils/EndpointError";
import {
  ApiCallAction,
  API_CALL_ACTION_TYPE,
  getApiActions,
} from "../middlewares/api";

export type AuthState = {
  loading: boolean;
  authUrl: string | null;
  user: UserModel | null;
  error?: EndpointError;
};

export const initialAuthState: AuthState = {
  loading: false,
  authUrl: null,
  user: null,
};

const authSlice = createSlice({
  initialState: initialAuthState,
  name: "auth",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAuthUrlApiActions.success,
      (state, { payload }: PayloadAction<AuthUrlModel>) => {
        state.loading = false;
        state.error = undefined;
        state.authUrl = payload.url;
      }
    );
    builder.addCase(
      getAuthTokenApiActions.success,
      (state, { payload }: PayloadAction<AuthUserModel>) => {
        state.loading = false;
        state.error = undefined;
        state.user = payload.user;
      }
    );
    builder.addMatcher(
      (action: AnyAction) =>
        [getAuthUrlApiActions.start, getAuthTokenApiActions.start].includes(
          action.type
        ),
      (state) => {
        state.loading = true;
        state.error = undefined;
      }
    );
    builder.addMatcher(
      (action: AnyAction) =>
        [getAuthUrlApiActions.failure, getAuthTokenApiActions.failure].includes(
          action.type
        ),
      (state, { payload }: PayloadAction<EndpointError>) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

enum Entities {
  GET_AUTH_URL = "GET_AUTH_URL",
  GET_AUTH_TOKEN = "GET_AUTH_TOKEN",
}

export const getAuthUrlApiActions = getApiActions(Entities.GET_AUTH_URL);
export const getAuthTokenApiActions = getApiActions(Entities.GET_AUTH_TOKEN);

export const getAuthUrl = (): ApiCallAction => {
  return {
    type: API_CALL_ACTION_TYPE,
    payload: {
      url: ENDPOINTS.GET_AUTH_URL,
      entity: Entities.GET_AUTH_URL,
      options: {
        credentials: "include",
      },
    },
  };
};

export const getAuthToken = (authCode: string): ApiCallAction => {
  return {
    type: API_CALL_ACTION_TYPE,
    payload: {
      url: `${ENDPOINTS.GET_AUTH_TOKEN}?code=${authCode}`,
      entity: Entities.GET_AUTH_TOKEN,
      options: {
        credentials: "include",
      },
    },
  };
};

export default authSlice.reducer;
