import type { Statuses, TaskModel } from "../types/task";
import { Task } from "./Task";

type TaskListProps = {
  title: string;
  tasks: TaskModel[];
  status?: string;
  onUpdateStatus?: (id: string, status: Statuses) => void;
};

export function TaskList({
  title,
  tasks,
  status,
  onUpdateStatus,
}: TaskListProps) {
  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight text-center mb-4">
        {title}
      </h1>
      <ul>
        {tasks.map(({ title, description, id }) => (
          <li key={id} className="mb-4 last:mb-0">
            <Task
              id={id}
              title={title}
              description={description}
              status={status}
              onUpdateStatus={onUpdateStatus}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
