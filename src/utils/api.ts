import { EndpointError } from "./EndpointError";

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
  GET_AUTH_URL: makeApiUrl("/auth/url"),
  GET_AUTH_TOKEN: makeApiUrl("/auth/token"),
  LOGOUT: makeApiUrl("/auth/logout"),
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
        throw new EndpointError(response.statusText, response.status);
      }

      return response;
    })
    .then((response) => {
      if (response.status === 204) {
        return response;
      }

      return response.json();
    });
}
