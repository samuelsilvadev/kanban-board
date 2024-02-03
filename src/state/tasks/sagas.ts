import { call, put, select, take } from "redux-saga/effects";
import { TaskModel } from "../../types/task";
import { ENDPOINTS } from "../../utils/api";
import { logger } from "../../utils/logger";
import { selectTaskById } from "./selectors";
import { EditTaskAction, editTasksApiActions } from './tasksSlice'

export function* watchEditTask() {
  logger.info('watchEditTask Saga')
  while (true) {
    logger.info(editTasksApiActions.start + ' passed',)
    const action: EditTaskAction = yield take(editTasksApiActions.start);
    logger.info(editTasksApiActions.start + ' passed',)
    console.log({ action })

    try {
      const task: TaskModel | undefined = yield select(selectTaskById, action.payload.id)
      const response: TaskModel = yield call(() => fetch(`${ENDPOINTS.EDIT_TASK}/${action.payload.id}`, { method: 'PATCH', body: JSON.stringify({ ...task, ...action.payload.fields }) }).then(response => response.json()))

      yield put({
        type: editTasksApiActions.success,
        payload: response
      })
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error editing a task - ${error.message}`)

        yield put({
          type: editTasksApiActions.failure,
          payload: error
        })
      } else {
        logger.error(`watchEditTask - ` + error)
      }
    }
  }
}
