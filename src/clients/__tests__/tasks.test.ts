import { http, HttpResponse } from "msw";
import { server } from "../../tests/server";
import { ENDPOINTS } from "../root";
import { tasksClient } from "../tasks";
import data from "../../../database/db.json";

describe("clients - tasks", () => {
  it("should return data correctly", async () => {
    server.use(
      http.get(ENDPOINTS.GET_TASKS, () => HttpResponse.json(data.tasks))
    );

    const response = await tasksClient.getAll();

    expect(response).toEqual(data.tasks);
  });

  it("should fail when status code is not between [200-299]", async () => {
    server.use(
      http.get(
        ENDPOINTS.GET_TASKS,
        () =>
          new HttpResponse(null, {
            status: 400,
          })
      )
    );

    const response = await tasksClient.getAll();

    expect((response as Error).message).toEqual("Bad Request");
  });

  it("should fail when response is a generic error", async () => {
    server.use(http.get(ENDPOINTS.GET_TASKS, () => HttpResponse.error()));

    const response = await tasksClient.getAll();

    expect((response as Error).message).toEqual("Failed to fetch");
  });

  it("should fail when response is not a valid JSON", async () => {
    server.use(
      http.get(
        ENDPOINTS.GET_TASKS,
        () => new HttpResponse("This is not a JSON")
      )
    );

    const response = await tasksClient.getAll();

    expect((response as Error).message).toMatch(
      /Unexpected token \D in JSON at position \d/
    );
  });
});
