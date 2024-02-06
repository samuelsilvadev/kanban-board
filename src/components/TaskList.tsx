import type { Statuses, TaskView } from "../types/task";
import { Task } from "./Task";

type TaskListProps = {
  title: string;
  tasks: TaskView[];
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
