import { render, screen } from "@testing-library/react";
import { Task } from "./Task";

const title = "Do laundry";
const description = "Wash clothes and fold them";

describe("<Task />", () => {
  it("should render task title and description", () => {
    render(<Task title={title} description={description} />);

    expect(screen.getByText(title)).toBeVisible();
    expect(screen.getByText(description)).toBeVisible();
  });

  it("should only render task title", () => {
    render(<Task title={title} />);

    expect(screen.getByText(title)).toBeVisible();
    expect(screen.queryByTestId("task-description")).not.toBeInTheDocument();
  });
});
