// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "../jest.polyfills";
import "@testing-library/jest-dom";
import { server } from "./tests/server";

function mockDialog() {
  HTMLDialogElement.prototype.show = function (this: HTMLDialogElement) {
    this.open = true;
  };

  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.open = true;
  };

  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    this.open = false;
  };
}

beforeAll(() => {
  server.listen();
  mockDialog();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
