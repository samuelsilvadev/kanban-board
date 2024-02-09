function error<T>(target: T) {
  if (process.env.NODE_ENV !== "test") {
    console.log(`🧨 - ERROR -`, target);
  }
}

function info<T>(target: T) {
  if (process.env.NODE_ENV !== "test") {
    console.log(`👷‍♀️ - INFO -`, target);
  }
}

export const logger = {
  info,
  error,
};
