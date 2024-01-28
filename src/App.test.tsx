import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { buildStore } from "./state/store";
import { server } from "./tests/server";
import { ENDPOINTS } from "./clients/root";
import data from "../database/db.json";
import { waitForLoadingToBeRemoved } from "./tests/utils";

describe("<App />", () => {
  beforeEach(() => {
    server.use(
      http.get(ENDPOINTS.GET_TASKS, () => HttpResponse.json(data.tasks))
    );
  });

  it("should render root page", async () => {
    render(
      <Provider store={buildStore()}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    expect(screen.getByRole("heading", { name: "Unstarted" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "In Progress" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Completed" })).toBeVisible();
  });
});
