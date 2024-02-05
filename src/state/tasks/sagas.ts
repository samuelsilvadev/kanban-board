import { call, put, select, takeLatest } from "redux-saga/effects";
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
      throw new Error("Task not found");
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
    if (error instanceof Error) {
      logger.error(`Error editing a task - ${error.message}`);

      yield put({
        type: editTasksApiActions.failure,
        payload: error,
      });
    } else {
      logger.error(`watchEditTask - ` + error);
    }
  }
}

export function* watchTaskSagas() {
  yield takeLatest(editTasksApiActions.start, editTaskSaga);
}
