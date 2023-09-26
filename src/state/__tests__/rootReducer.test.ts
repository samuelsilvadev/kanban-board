import { rootReducer } from "../rootReducer";

describe("reducers - root reducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, { type: "RANDOM_ACTION" })).toEqual({
      tasks: [],
    });
  });
});
