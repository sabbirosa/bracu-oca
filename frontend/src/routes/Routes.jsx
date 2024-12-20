import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <p>Error</p>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login/>,
      }
    ],
  },
]);
