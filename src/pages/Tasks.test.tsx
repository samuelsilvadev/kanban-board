import { render, screen } from "@testing-library/react";
import { TASKS_MOCK, Tasks } from "./Tasks";
import { TASK_STATUSES } from "../consts/statuses";
import { store } from "../state/store";
import { Provider } from "react-redux";

describe("<Tasks />", () => {
  it("should render tasks correctly", () => {
    render(
      <Provider store={store}>
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
});
