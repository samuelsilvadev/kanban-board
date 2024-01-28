import { useEffect } from "react";
import { TaskList } from "../components/TaskList";
import { STATUS_MAPPER, TASK_STATUSES } from "../consts/statuses";
import type { Statuses } from "../types/task";
import { useTasks } from "../state/tasks/useTasks";
import { Loader } from "../components/Loader";
import { ErrorDisplay } from "../components/ErrorDisplay";

export function Tasks() {
  const { isLoaded, isLoading, tasks, error, editTask, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleOnUpdateStatus = (id: string, status: Statuses) => {
    editTask(id, { status });
  };

  const handleOnReload = () => {
    getTasks();
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

  if (error) {
    return <ErrorDisplay message={error.message} onReload={handleOnReload} />;
  }

  if (!isLoaded || isLoading) {
    return <Loader />;
  }

  return (
    <main className="p-5">
      <ul className="flex flex-col md:flex-row w-full">
        {TASK_STATUSES.map(renderTaskList)}
      </ul>
    </main>
  );
}
