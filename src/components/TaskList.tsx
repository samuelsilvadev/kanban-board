import { STATUS_TO_TITLE_MAPPER } from "../consts/statuses";
import type { Statuses, TaskView } from "../types/task";
import { Task } from "./Task";

type TaskListProps = {
  tasks: TaskView[];
  status?: Statuses;
  onUpdateStatus?: (id: string, status: Statuses) => void;
};

export function TaskList({
  tasks,
  status = "OPEN",
  onUpdateStatus,
}: TaskListProps) {
  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight text-center mb-4">
        {STATUS_TO_TITLE_MAPPER.get(status)}
      </h1>
      <ul>
        {tasks.map(({ title, description, id, timerSpend }) => (
          <li key={id} className="mb-4 last:mb-0">
            <Task
              id={id}
              title={title}
              description={description}
              status={status}
              timerSpend={timerSpend}
              onUpdateStatus={onUpdateStatus}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
