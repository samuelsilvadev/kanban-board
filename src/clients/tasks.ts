import { CreateTaskBody, TaskModel } from "../types/task";
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

    logger.error(
      `🔥 Error caught on client - GET ALL TASKS: ${normalizedError}`
    );

    return normalizedError;
  }
}

async function create(body: CreateTaskBody) {
  try {
    const response = await fetch(ENDPOINTS.CREATE_TASK, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const task: TaskModel = await response.json();

    return task;
  } catch (error) {
    const normalizedError =
      error instanceof Error ? error : new Error("Unknown error");

    logger.error(`🔥 Error caught on client - CREATE TASK: ${normalizedError}`);

    return normalizedError;
  }
}

export const tasksClient = { getAll, create };
