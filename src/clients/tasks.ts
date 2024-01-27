import { TaskModel } from "../types/task";
import { makeApiUrl } from "./root";

async function getAll(): Promise<TaskModel[] | Error> {
  try {
    const response = await fetch(makeApiUrl("/tasks"));

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const tasks: TaskModel[] = await response.json();

    return tasks;
  } catch (error) {
    console.log("🔥 Error caught on client", error);

    if (error instanceof Error) {
      return error;
    }

    return new Error("Unknown error");
  }
}

export const tasksClient = { getAll };
