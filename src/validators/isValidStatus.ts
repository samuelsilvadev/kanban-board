import { TASK_STATUSES_IDENTIFIERS } from "../consts/statuses";
import type { Statuses } from "../types/task";

export function isValidStatus(status: string): status is Statuses {
  return TASK_STATUSES_IDENTIFIERS.includes(status as Statuses);
}
