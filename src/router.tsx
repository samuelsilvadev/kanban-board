import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Login } from "./pages/Login";
import { LoginCallback } from "./pages/LoginCallback";
import { Tasks } from "./pages/Tasks";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/auth/callback",
    element: <LoginCallback />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
];

export const router = createBrowserRouter(routes);
