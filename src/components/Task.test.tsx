import { render, screen } from "@testing-library/react";
import { Task } from "./Task";
import userEvent from "@testing-library/user-event";

const title = "Do laundry";
const description = "Wash clothes and fold them";

describe("<Task />", () => {
  it("should render task title and description", () => {
    render(<Task id="1" title={title} description={description} />);

    expect(screen.getByText(title)).toBeVisible();
    expect(screen.getByText(description)).toBeVisible();
  });

  it("should only render task title", () => {
    render(<Task id="1" title={title} />);

    expect(screen.getByText(title)).toBeVisible();
    expect(screen.queryByTestId("task-description")).not.toBeInTheDocument();
  });

  it("should call `onUpdateStatus` when status change", () => {
    const handleOnUpdateStatus = jest.fn();

    render(<Task id="1" title={title} onUpdateStatus={handleOnUpdateStatus} />);

    const select = screen.getByLabelText("Update task status");

    userEvent.selectOptions(select, "IN_PROGRESS");

    expect(handleOnUpdateStatus).toHaveBeenCalledTimes(1);
    expect(handleOnUpdateStatus).toHaveBeenCalledWith("1", "IN_PROGRESS");
  });
});
