import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { toTaskModel } from "../../mappers/toTaskModel";
import { TaskModel } from "../../types/task";
import { ENDPOINTS, fetchFacade } from "../../utils/api";
import { EndpointError } from "../../utils/EndpointError";
import { logger } from "../../utils/logger";
import { takeLatestById } from "../rootSaga";
import { selectTaskById } from "./selectors";
import {
  EditTaskAction,
  editTasksApiActions,
  incrementTimer,
  startTimer,
  stopTimer,
} from "./tasksSlice";

function _editTaskClient(body: TaskModel): Promise<TaskModel> {
  return fetchFacade(`${ENDPOINTS.EDIT_TASK}/${body.id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function* editTaskSaga(action: EditTaskAction) {
  try {
    const task: TaskModel | undefined = yield select(
      selectTaskById,
      action.payload.id
    );

    if (!task) {
      throw new Error(
        "Task was lost in the middle of the process. Reload the page."
      );
    }

    const response: TaskModel = yield call(
      _editTaskClient,
      toTaskModel({
        ...task,
        ...action.payload.fields,
      })
    );

    yield put({
      type: editTasksApiActions.success,
      payload: response,
    });

    logger.info(`Task edited successfully - ${response.id}`);

    yield _handleTaskTimer(response, task);
  } catch (error) {
    let safeError: EndpointError;

    if (error instanceof EndpointError) {
      safeError = error;
    } else {
      safeError = new EndpointError(
        error instanceof Error ? error.message : "Unknown error on edit task"
      );
    }

    logger.error(`Error editing a task - ${safeError.message}`);

    yield put({
      type: editTasksApiActions.failure,
      payload: safeError,
    });
  }
}

function* _handleTaskTimer(response: TaskModel, task: TaskModel) {
  logger.info(`_handleTaskTimer - ${response.id}`);

  if (response.status === "IN_PROGRESS" && task.status !== "IN_PROGRESS") {
    yield put({
      type: startTimer.type,
      payload: { id: response.id },
    });
  } else if (response.status !== "IN_PROGRESS") {
    yield put({
      type: stopTimer.type,
      payload: { id: response.id },
    });
  }
}

function* handleProgressTimerSaga({
  type,
  payload,
}: ReturnType<typeof startTimer | typeof stopTimer>) {
  logger.info(`handleProgressTimerSaga - ${type}`);

  if (type === stopTimer.type) {
    return;
  }

  while (true) {
    yield delay(1000);
    yield put(incrementTimer(payload));
  }
}

export function* watchTaskSagas() {
  yield takeLatest(editTasksApiActions.start, editTaskSaga);
  yield takeLatestById(
    [startTimer.type, stopTimer.type],
    handleProgressTimerSaga
  );
}
