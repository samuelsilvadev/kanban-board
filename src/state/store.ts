import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

export const buildStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

type Store = ReturnType<typeof buildStore>;

export type RootState = ReturnType<Store["getState"]>;
