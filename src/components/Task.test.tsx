import { render, screen } from "@testing-library/react";
import { Task } from "./Task";

describe("<Task />", () => {
  it("should render task title and description", () => {
    const title = "Do laundry";
    const description = "Wash clothes and fold them";

    render(<Task title={title} description={description} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
