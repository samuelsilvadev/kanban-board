import { render, screen } from "@testing-library/react";
import { TASKS_MOCK, Tasks } from "./Tasks";
import { TASK_STATUSES } from "../consts/statuses";
import { buildStore } from "../state/store";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

describe("<Tasks />", () => {
  it("should render tasks correctly", () => {
    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    TASK_STATUSES.forEach((status) => {
      expect(screen.getByRole("heading", { name: status })).toBeVisible();
    });

    TASKS_MOCK.forEach(({ title, description }) => {
      expect(screen.getByText(title)).toBeVisible();
      expect(screen.getByText(description)).toBeVisible();
    });
  });

  it("should update task status", () => {
    render(
      <Provider store={buildStore()}>
        <Tasks />
      </Provider>
    );

    expect(screen.getAllByDisplayValue("Completed")).toHaveLength(1);

    const openTaskSelector = screen.getAllByLabelText("Update task status")[0];

    userEvent.selectOptions(openTaskSelector, "DONE");

    expect(screen.getAllByDisplayValue("Completed")).toHaveLength(2);
  });
});
