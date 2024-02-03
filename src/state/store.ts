import { AnyAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiMiddleware } from "./middlewares/api";
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "./rootSaga";



export const buildStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiMiddleware, sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga)

  return store;
};



type Store = ReturnType<typeof buildStore>;

export type RootState = ReturnType<Store["getState"]>;

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
