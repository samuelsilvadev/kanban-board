import { useEffect } from "react";
import { useTasks } from "../state/tasks/useTasks";
import { Loader } from "../components/Loader";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { CreateTask } from "../components/CreateTask";
import { Search } from "../components/Search";
import { TasksGroups } from "../components/TasksGroups";

export function Tasks() {
  const { isLoaded, isLoading, error, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleOnReload = () => {
    getTasks();
  };

  if (error) {
    return <ErrorDisplay message={error.message} onReload={handleOnReload} />;
  }

  if (!isLoaded || isLoading) {
    return <Loader />;
  }

  return (
    <>
      <header className="p-5 pb-0 flex justify-end gap-5">
        <Search />
        <CreateTask />
      </header>
      <main className="m-5 p-5 border border-slate-700">
        <TasksGroups />
      </main>
    </>
  );
}
