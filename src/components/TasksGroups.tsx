import { useTasks } from "../state/tasks/useTasks";
import { Statuses } from "../types/task";
import { isValidStatus } from "../validators/isValidStatus";
import { TaskList } from "./TaskList";

export function TasksGroups() {
  const { tasks, editTask } = useTasks();

  const handleOnUpdateStatus = (id: string, status: Statuses) => {
    editTask(id, { status });
  };

  return (
    <ul className="flex flex-col md:flex-row w-full">
      {Object.entries(tasks).map(([status, tasks]) => {
        return (
          <li className="flex-grow md:w-1/3 py-4 md:py-0 md:px-4" key={status}>
            <TaskList
              tasks={tasks}
              status={isValidStatus(status) ? status : "OPEN"}
              onUpdateStatus={handleOnUpdateStatus}
            />
          </li>
        );
      })}
    </ul>
  );
}
