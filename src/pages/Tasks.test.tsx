import { render, screen, waitFor } from "@testing-library/react";
import { Tasks } from "./Tasks";
import { TASK_STATUSES } from "../consts/statuses";
import { buildStore } from "../state/store";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { TaskModel } from "../types/task";
import data from "../__fixtures__/projects.json";
import { toTaskModel } from "../mappers/toTaskModel";
import { server } from "../tests/server";
import { http, HttpResponse } from "msw";
import { getReloadButton, waitForLoadingToBeRemoved } from "../tests/utils";
import { ENDPOINTS } from "../utils/api";

const TASKS_MOCK: TaskModel[] = data[0].tasks.map(toTaskModel);

describe("<Tasks />", () => {
  beforeEach(() => {
    server.use(http.get(ENDPOINTS.GET_PROJECTS, () => HttpResponse.json(data)));
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
    server.use(
      http.put(`${ENDPOINTS.EDIT_TASK}/:id`, async ({ request }) =>
        HttpResponse.json(await request.json())
      )
    );

    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    expect(screen.getAllByDisplayValue("Completed")).toHaveLength(1);

    const openTaskSelector = screen.getAllByLabelText("Update task status")[0];

    userEvent.selectOptions(openTaskSelector, "DONE");

    await waitForLoadingToBeRemoved();

    expect(screen.getAllByDisplayValue("Completed")).toHaveLength(2);
  });

  it("should display error message when update task fail task status", async () => {
    server.use(
      http.put(`${ENDPOINTS.EDIT_TASK}/:id`, () => HttpResponse.error())
    );

    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    expect(screen.getAllByDisplayValue("Completed")).toHaveLength(1);

    const openTaskSelector = screen.getAllByLabelText("Update task status")[0];

    userEvent.selectOptions(openTaskSelector, "DONE");

    await waitForLoadingToBeRemoved();

    expect(screen.getByText(/Failed to fetch/)).toBeVisible();
  });

  it("should display error message", async () => {
    server.use(http.get(ENDPOINTS.GET_PROJECTS, () => HttpResponse.error()));

    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    expect(screen.getByText(/Failed to fetch/)).toBeVisible();
  });

  it("should reload the page when an error happens", async () => {
    server.use(http.get(ENDPOINTS.GET_PROJECTS, () => HttpResponse.error()));

    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    expect(screen.getByText(/Failed to fetch/)).toBeVisible();

    server.use(http.get(ENDPOINTS.GET_PROJECTS, () => HttpResponse.json(data)));

    const reloadButton = getReloadButton();

    await userEvent.click(reloadButton);

    expect(screen.queryByText(/Failed to fetch/)).not.toBeInTheDocument();
  });

  it("should display create task modal", async () => {
    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    const createTaskButton = screen.getByRole("button", {
      name: /Create Task/,
    });

    await userEvent.click(createTaskButton);

    await waitFor(() => {
      expect(screen.getByLabelText("Task Name")).toBeVisible();
    });
    expect(screen.getByLabelText("Task Description")).toBeVisible();
    expect(screen.getByRole("button", { name: /Save/ })).toBeVisible();
  });

  it("should create a task", async () => {
    server.use(
      http.post(ENDPOINTS.CREATE_TASK, async ({ request }) => {
        const body = await request.json();

        if (!body || typeof body !== "object") {
          return HttpResponse.error();
        }

        return HttpResponse.json(
          { ...body, id: new Date().getTime() },
          { status: 201 }
        );
      })
    );

    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    const createTaskButton = screen.getByRole("button", {
      name: /Create Task/,
    });

    await userEvent.click(createTaskButton);

    const taskTitle = screen.getByLabelText("Task Name");
    const taskDescription = screen.getByLabelText("Task Description");
    const saveButton = screen.getByRole("button", { name: /Save/ });

    await userEvent.type(taskTitle, "New Task");
    await userEvent.type(taskDescription, "New Task Description");
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeVisible();
    });
    expect(screen.getByText("New Task Description")).toBeVisible();
    expect(
      screen.queryByRole("button", { name: /Save/ })
    ).not.toBeInTheDocument();
  });

  it("should search tasks", async () => {
    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    const searchInput = screen.getByLabelText("Search for a task");

    await userEvent.type(searchInput, TASKS_MOCK[0].title);

    expect(screen.getByText(TASKS_MOCK[0].title)).toBeVisible();
    expect(screen.queryByText(TASKS_MOCK[1].title)).not.toBeInTheDocument();
    expect(screen.queryByText(TASKS_MOCK[2].title)).not.toBeInTheDocument();
  });

  it("should display empty page when search is without result", async () => {
    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    const searchInput = screen.getByLabelText("Search for a task");

    await userEvent.type(searchInput, "This does not exist");

    TASKS_MOCK.forEach((task) => {
      expect(screen.queryByText(task.title)).not.toBeInTheDocument();
    });
  });

  it("should switch projects", async () => {
    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    const firstProjectTitle = data[0].title;
    const secondProjectTitle = data[1].title;

    expect(
      (
        screen.getByRole("option", {
          name: firstProjectTitle,
        }) as HTMLOptionElement
      ).selected
    ).toBe(true);
    expect(
      (
        screen.getByRole("option", {
          name: secondProjectTitle,
        }) as HTMLOptionElement
      ).selected
    ).toBe(false);

    const changeProjectSelector = screen.getByLabelText("Select project:");

    await userEvent.selectOptions(changeProjectSelector, "2");

    expect(
      (
        screen.getByRole("option", {
          name: firstProjectTitle,
        }) as HTMLOptionElement
      ).selected
    ).toBe(false);
    expect(
      (
        screen.getByRole("option", {
          name: secondProjectTitle,
        }) as HTMLOptionElement
      ).selected
    ).toBe(true);
  });

  it("should list different tasks when switching projects", async () => {
    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    await waitForLoadingToBeRemoved();

    const firstProjectTasks = data[0].tasks.map(toTaskModel);
    const secondProjectTasks = data[1].tasks.map(toTaskModel);

    firstProjectTasks.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeVisible();
    });

    secondProjectTasks.forEach(({ title }) => {
      expect(screen.queryByText(title)).not.toBeInTheDocument();
    });

    const changeProjectSelector = screen.getByLabelText("Select project:");

    await userEvent.selectOptions(changeProjectSelector, "2");

    firstProjectTasks.forEach(({ title }) => {
      expect(screen.queryByText(title)).not.toBeInTheDocument();
    });

    secondProjectTasks.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeVisible();
    });
  });
});
