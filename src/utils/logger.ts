export function error(message: string) {
  if (process.env.NODE_ENV !== "test") {
    console.log(message);
  }
}

export const logger = {
  error,
};
