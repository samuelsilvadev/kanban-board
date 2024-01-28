import { screen, waitForElementToBeRemoved } from "@testing-library/dom";

export async function waitForLoadingToBeRemoved() {
  await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
}
