export class EndpointError extends Error {
  status: number | undefined;
  details: string;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "EndpointError";
    this.details = message;
    this.status = status;
  }
}
