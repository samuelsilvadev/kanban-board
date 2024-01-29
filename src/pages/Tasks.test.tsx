import { render, screen } from "@testing-library/react";
import { Tasks } from "./Tasks";
import { TASK_STATUSES } from "../consts/statuses";
import { buildStore } from "../state/store";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { TaskModel } from "../types/task";
import data from "../../database/db.json";
import { toTaskModel } from "../mappers/toTaskModel";
import { server } from "../tests/server";
import { http, HttpResponse } from "msw";
import { ENDPOINTS } from "../clients/root";
import { getReloadButton, waitForLoadingToBeRemoved } from "../tests/utils";

const TASKS_MOCK: TaskModel[] = data.tasks.map(toTaskModel);

describe("<Tasks />", () => {
  beforeEach(() => {
    server.use(
      http.get(ENDPOINTS.GET_TASKS, () => HttpResponse.json(data.tasks))
    );
  });

  it("should render tasks correctly", async () => {
    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    TASK_STATUSES.forEach((status) => {
      expect(screen.getByRole("heading", { name: status })).toBeVisible();
    });

    TASKS_MOCK.forEach(({ title, description }) => {
      expect(screen.getByText(title)).toBeVisible();

      if (description) {
        expect(screen.getByText(description)).toBeVisible();
      }
    });
  });

  it("should update task status", async () => {
    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    expect(screen.getAllByDisplayValue("Completed")).toHaveLength(1);

    const openTaskSelector = screen.getAllByLabelText("Update task status")[0];

    userEvent.selectOptions(openTaskSelector, "DONE");

    expect(screen.getAllByDisplayValue("Completed")).toHaveLength(2);
  });

  it("should display error message", async () => {
    server.use(http.get(ENDPOINTS.GET_TASKS, () => HttpResponse.error()));

    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    expect(screen.getByText(/Failed to fetch/)).toBeVisible();
  });

  it("should reload the page when an error happens", async () => {
    server.use(http.get(ENDPOINTS.GET_TASKS, () => HttpResponse.error()));

    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    expect(screen.getByText(/Failed to fetch/)).toBeVisible();

    server.use(
      http.get(ENDPOINTS.GET_TASKS, () => HttpResponse.json(data.tasks))
    );

    const reloadButton = getReloadButton();

    await userEvent.click(reloadButton);

    expect(screen.queryByText(/Failed to fetch/)).not.toBeInTheDocument();
  });
});
