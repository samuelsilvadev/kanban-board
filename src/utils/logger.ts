export function error(message: string) {
  if (process.env.NODE_ENV !== "test") {
    console.log(`🧨 - ERROR - ${message}`);
  }
}

export function info<T>(target: T) {
  if (process.env.NODE_ENV !== "test") {
    console.log(`👷‍♀️ - INFO -`, target);
  }
}

export const logger = {
  info,
  error,
};
