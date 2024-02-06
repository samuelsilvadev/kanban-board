import { RawTaskModel, TaskView, TaskModel } from "../types/task";
import { isValidStatus } from "../validators/isValidStatus";

export function toTaskModel(task: RawTaskModel | TaskView): TaskModel {
  const fieldsBlacklist = new Set(["timerSpend"]);

  return Object.keys(task).reduce<TaskModel>(
    (taskModel, key) => {
      if (fieldsBlacklist.has(key)) {
        delete taskModel[key as keyof TaskModel];
      }

      return taskModel;
    },
    {
      ...task,
      status: isValidStatus(task.status) ? task.status : "OPEN",
    }
  );
}

export function toTaskView(taskModel: TaskModel): TaskView {
  return {
    ...taskModel,
    timerSpend: 0,
  };
}
