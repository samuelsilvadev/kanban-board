import { TaskList } from "../components/TaskList";
import { TaskModel } from "../types/task";

const STATUS_MAPPER = new Map([
  ["Unstarted", "OPEN"],
  ["In Progress", "IN_PROGRESS"],
  ["Completed", "DONE"],
]);

const tasks: TaskModel[] = [
  { id: "1", title: "Task 1", description: "Description 1", status: "OPEN" },
  { id: "2", title: "Task 2", description: "Description 2", status: "DONE" },
  {
    id: "3",
    title: "Task 3",
    description: "Description 3",
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    title: "Task 4",
    description: "Description 4",
    status: "IN_PROGRESS",
  },
];

const TASK_STATUSES = Array.from(STATUS_MAPPER.keys());

export function Tasks() {
  const renderTaskList = (status: string) => {
    const normalizedStatus = STATUS_MAPPER.get(status);
    const tasksByStatus = tasks.filter(
      (task) => task.status === normalizedStatus
    );

    return (
      <li className="flex-grow py-4 md:py-0 md:px-4" key={status}>
        <TaskList title={status} tasks={tasksByStatus} />
      </li>
    );
  };

  return (
    <main className="p-5">
      <ul className="flex flex-col md:flex-row w-full">
        {TASK_STATUSES.map(renderTaskList)}
      </ul>
    </main>
  );
}
