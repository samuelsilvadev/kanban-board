const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export function makeApiUrl(endpoint: string): string {
  return BASE_URL + endpoint;
}

export const ENDPOINTS = {
  GET_TASKS: makeApiUrl("/tasks"),
  CREATE_TASK: makeApiUrl("/tasks"),
};
