import type { TaskModel } from "../types/task";
import { Task } from "./Task";

type TaskListProps = { title: string; tasks: TaskModel[] };

export function TaskList({ title, tasks }: TaskListProps) {
  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight text-center mb-4">
        {title}
      </h1>
      <ul>
        {tasks.map(({ title, description, id }) => (
          <li key={id} className="mb-4 last:mb-0">
            <Task title={title} description={description} />
          </li>
        ))}
      </ul>
    </article>
  );
}
