import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

describe("<App />", () => {
  it("should render root page", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Unstarted" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "In Progress" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Completed" })).toBeVisible();
  });
});
