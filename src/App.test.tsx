import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { buildStore } from "./state/store";

describe("<App />", () => {
  it("should render root page", () => {
    render(
      <Provider store={buildStore()}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("heading", { name: "Unstarted" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "In Progress" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Completed" })).toBeVisible();
  });
});
