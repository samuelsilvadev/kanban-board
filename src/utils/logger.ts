export function error(message: string) {
  if (process.env.NODE_ENV !== "test") {
    console.log(`🧨 - ERROR - ${message}`);
  }
}

export function info(message: string) {
  if (process.env.NODE_ENV !== "test") {
    console.log(`👷‍♀️ - INFO - ${message}`);
  }
}

export const logger = {
  info,
  error,
};
