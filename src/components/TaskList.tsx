import type { TaskModel } from "../types/task";
import { Task } from "./Task";

type TaskListProps = { title: string; tasks: TaskModel[]; status?: string };

export function TaskList({ title, tasks, status }: TaskListProps) {
  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight text-center mb-4">
        {title}
      </h1>
      <ul>
        {tasks.map(({ title, description, id }) => (
          <li key={id} className="mb-4 last:mb-0">
            <Task title={title} description={description} status={status} />
          </li>
        ))}
      </ul>
    </article>
  );
}
