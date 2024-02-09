import { Statuses } from "../types/task";

export const STATUS_MAPPER = new Map<string, Statuses>([
  ["Unstarted", "OPEN"],
  ["In Progress", "IN_PROGRESS"],
  ["Completed", "DONE"],
]);

export const STATUS_TO_TITLE_MAPPER = new Map<Statuses, string>([
  ["OPEN", "Unstarted"],
  ["IN_PROGRESS", "In Progress"],
  ["DONE", "Completed"],
]);

export const TASK_STATUSES = Array.from(STATUS_MAPPER.keys());

export const TASK_STATUSES_IDENTIFIERS = Array.from(STATUS_MAPPER.values());
