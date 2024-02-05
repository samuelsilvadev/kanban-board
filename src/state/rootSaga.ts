import { logger } from "../utils/logger";
import { fork } from "redux-saga/effects";
import { watchEditTask } from "./tasks/sagas";

export function* rootSaga() {
  logger.info("Started root saga");

  yield fork(watchEditTask);
}
