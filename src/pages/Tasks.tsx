import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { CreateTask } from "../components/CreateTask";
import { Search } from "../components/Search";
import { TasksGroups } from "../components/TasksGroups";
import { useProjects } from "../state/hooks/useProjects";
import { ChangeProjectSelector } from "../components/ChangeProjectSelector";
import { useTasks } from "../state/hooks/useTasks";

export function Tasks() {
  const { isLoading: isTasksLoading, error: tasksError } = useTasks();
  const { getProjects, isLoaded, isLoading, error } = useProjects();

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const handleOnReload = () => {
    getProjects();
  };

  if (error || tasksError) {
    return (
      <ErrorDisplay
        message={error?.message ?? tasksError?.message ?? "Unknown error"}
        onReload={handleOnReload}
        errorStatus={error?.status || tasksError?.status}
      />
    );
  }

  if (!isLoaded || isLoading || isTasksLoading) {
    return <Loader />;
  }

  return (
    <>
      <header className="p-5 pb-0 flex flex-wrap md:flex-nowrap items-end justify-end gap-5">
        <ChangeProjectSelector />
        <Search />
        <CreateTask />
      </header>
      <main className="m-5 p-5 border border-slate-700">
        <TasksGroups />
      </main>
    </>
  );
}
