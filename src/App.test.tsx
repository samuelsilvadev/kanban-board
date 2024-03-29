import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { buildStore } from "./state/store";
import { server } from "./tests/server";
import data from "./__fixtures__/projects.json";
import { waitForLoadingToBeRemoved } from "./tests/utils";
import { ENDPOINTS } from "./utils/api";
import urlData from "./__fixtures__/url.json";
import userData from "./__fixtures__/user.json";
import { routes } from "./router";

describe("<App />", () => {
  it("should render login page", async () => {
    server.use(
      http.get(ENDPOINTS.GET_AUTH_URL, () => HttpResponse.json(urlData))
    );

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(
      <Provider store={buildStore()}>
        <RouterProvider router={router} />
      </Provider>
    );

    expect(screen.getByRole("button", { name: "Login" })).toBeVisible();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Login" })).toBeEnabled();
    });
  });

  it("should render login callback page", async () => {
    server.use(
      http.get(ENDPOINTS.GET_AUTH_TOKEN, () => HttpResponse.json(userData)),
      http.get(ENDPOINTS.GET_PROJECTS, () => HttpResponse.json(data))
    );

    const router = createMemoryRouter(routes, {
      initialEntries: ["/auth/callback?code=123"],
    });

    render(
      <Provider store={buildStore()}>
        <RouterProvider router={router} />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    expect(screen.getByRole("heading", { name: "Unstarted" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "In Progress" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Completed" })).toBeVisible();
  });

  it("should render projects page", async () => {
    server.use(http.get(ENDPOINTS.GET_PROJECTS, () => HttpResponse.json(data)));

    const router = createMemoryRouter(routes, {
      initialEntries: ["/tasks"],
    });

    render(
      <Provider store={buildStore()}>
        <RouterProvider router={router} />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    expect(screen.getByRole("heading", { name: "Unstarted" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "In Progress" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Completed" })).toBeVisible();
  });
});
