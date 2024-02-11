const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export function makeApiUrl(endpoint: string): string {
  return BASE_URL + endpoint;
}

export const ENDPOINTS = {
  /**
   * @deprecated
   */
  GET_TASKS: makeApiUrl("/tasks"),
  CREATE_TASK: makeApiUrl("/tasks"),
  EDIT_TASK: makeApiUrl("/tasks"),
  GET_PROJECTS: makeApiUrl("/projects?_embed=tasks"),
};

export function fetchFacade<Response>(
  url: string,
  requestOptions?: RequestInit
): Promise<Response> {
  return fetch(
    url,
    requestOptions
      ? {
          ...requestOptions,
          headers: {
            "Content-Type": "application/json",
            ...requestOptions.headers,
          },
        }
      : undefined
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response;
    })
    .then((response) => response.json());
}
