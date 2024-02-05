import { call, put, select, takeLatest } from "redux-saga/effects";
import { ErrorMessage } from "../../types/error";
import { TaskModel } from "../../types/task";
import { ENDPOINTS } from "../../utils/api";
import { logger } from "../../utils/logger";
import { selectTaskById } from "./selectors";
import { EditTaskAction, editTasksApiActions } from "./tasksSlice";

function editTaskClient(body: TaskModel) {
  return fetch(`${ENDPOINTS.EDIT_TASK}/${body.id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
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

    const response: TaskModel = yield call(editTaskClient, {
      ...task,
      ...action.payload.fields,
    });

    yield put({
      type: editTasksApiActions.success,
      payload: response,
    });
  } catch (error) {
    const errorMessage: ErrorMessage = {
      message:
        error instanceof Error ? error.message : "Unknown error on edit task",
    };

    logger.error(`Error editing a task - ${errorMessage.message}`);

    yield put({
      type: editTasksApiActions.failure,
      payload: errorMessage,
    });
  }
}

export function* watchTaskSagas() {
  yield takeLatest(editTasksApiActions.start, editTaskSaga);
}
