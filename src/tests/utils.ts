import { screen, waitForElementToBeRemoved } from "@testing-library/dom";

export async function waitForLoadingToBeRemoved() {
  await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
}

export function getReloadButton() {
  return screen.getByRole("button", { name: "Try to reload" });
}
