import { logger } from "../utils/logger";
import { fork, put, take, takeLatest } from "redux-saga/effects";
import { watchTaskSagas } from "./tasks/sagas";
import { channel, Saga } from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";

export function* rootSaga() {
  logger.info("Started root saga");

  yield fork(watchTaskSagas);
}

export function* takeLatestById<Payload extends { id: string }>(
  actionType: string | string[],
  saga: Saga
) {
  const channels = new Map();

  logger.info(`Started takeLatestById for ${actionType}`);

  while (true) {
    const action: PayloadAction<Payload> = yield take(actionType);

    logger.info(`Received action on takeLatestById: ${JSON.stringify(action)}`);

    const { id } = action.payload;

    if (!channels.has(id)) {
      channels.set(id, channel());

      logger.info(`Created channel on takeLatestById for: ${id}`);

      yield takeLatest(channels.get(id), saga);
    }

    logger.info(`Dispatch action on takeLatestById to channel for: ${id}`);

    yield put(channels.get(id), action);
  }
}
