import { useEffect } from "react";
import { TaskList } from "../components/TaskList";
import { STATUS_MAPPER, TASK_STATUSES } from "../consts/statuses";
import { Statuses, TaskModel } from "../types/task";
import { useTasks } from "../state/tasks/useTasks";

const TASKS_MOCK: TaskModel[] = [
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

export function Tasks() {
  const { tasks, setTasks, editTask } = useTasks();

  useEffect(() => {
    setTasks(TASKS_MOCK);
  }, [setTasks]);

  const handleOnUpdateStatus = (id: string, status: Statuses) => {
    editTask(id, { status });
  };

  const renderTaskList = (status: string) => {
    const statusIdentifier = STATUS_MAPPER.get(status);
    const tasksByStatus = tasks.filter(
      (task) => task.status === statusIdentifier
    );

    return (
      <li className="flex-grow md:w-1/3 py-4 md:py-0 md:px-4" key={status}>
        <TaskList
          title={status}
          tasks={tasksByStatus}
          status={statusIdentifier}
          onUpdateStatus={handleOnUpdateStatus}
        />
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
