export const STATUS_MAPPER = new Map([
  ["Unstarted", "OPEN"],
  ["In Progress", "IN_PROGRESS"],
  ["Completed", "DONE"],
]);

export const TASK_STATUSES = Array.from(STATUS_MAPPER.keys());

export const TASK_STATUSES_IDENTIFIERS = Array.from(STATUS_MAPPER.values());
