import { RawTaskModel, TaskModel } from "../types/task";
import { isValidStatus } from "../validators/isValidStatus";

export function toTaskModel(task: RawTaskModel): TaskModel {
  return {
    ...task,
    status: isValidStatus(task.status) ? task.status : "OPEN",
  };
}
