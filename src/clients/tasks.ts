import { TaskModel } from "../types/task";
import { logger } from "../utils/logger";
import { ENDPOINTS } from "./root";

async function getAll(): Promise<TaskModel[] | Error> {
  try {
    const response = await fetch(ENDPOINTS.GET_TASKS);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const tasks: TaskModel[] = await response.json();

    return tasks;
  } catch (error) {
    const normalizedError =
      error instanceof Error ? error : new Error("Unknown error");

    logger.error(`🔥 Error caught on client: ${normalizedError}`);

    return normalizedError;
  }
}

export const tasksClient = { getAll };
