import { createBrowserRouter } from "react-router-dom";
import Landing from "./features/landing/pages/Landing";
import TwoColumnLayout from "./features/auth/Layouts/TwoColumnLayout";
import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";
import Google from "./features/auth/pages/Google";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/auth",
    element: <TwoColumnLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "google",
        element: <Google />,
      }
    ]
  },
  {
    path: "*",
    element: <div>404 Not Found</div>
  }
]);

export default router;