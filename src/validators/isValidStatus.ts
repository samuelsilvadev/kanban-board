import { TASK_STATUSES_IDENTIFIERS } from "../consts/statuses";
import { Statuses } from "../types/task";

export function isValidStatus(status: string): status is Statuses {
  return TASK_STATUSES_IDENTIFIERS.includes(status);
}
