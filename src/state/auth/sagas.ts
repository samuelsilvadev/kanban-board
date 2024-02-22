import { call, put, takeLatest } from "redux-saga/effects";
import { router } from "../../router";
import { ENDPOINTS, fetchFacade } from "../../utils/api";
import { EndpointError } from "../../utils/EndpointError";
import { logger } from "../../utils/logger";
import { logout, logoutApiActions } from "./authSlice";

function _logoutClient() {
  return fetchFacade(ENDPOINTS.LOGOUT, {
    method: "POST",
    credentials: "include",
  });
}

function* logoutSaga() {
  try {
    yield call(_logoutClient);
    yield put({
      type: logoutApiActions.success,
    });
    yield call(router.navigate, "/");
  } catch (error) {
    let safeError: EndpointError;

    if (error instanceof EndpointError) {
      safeError = error;
    } else {
      safeError = new EndpointError(
        error instanceof Error ? error.message : "Unknown error on logout"
      );
    }

    logger.error(`Error logging out - ${safeError.message}`);

    yield put({
      type: logoutApiActions.failure,
      payload: safeError,
    });
  }
}

export function* watchAuthSagas() {
  yield takeLatest(logout.type, logoutSaga);
}
