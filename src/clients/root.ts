const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export function makeApiUrl(endpoint: string) {
  return BASE_URL + endpoint;
}
