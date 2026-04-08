import { createBrowserRouter } from "react-router-dom";
import Landing from "./features/landing/pages/Landing";
import AuthLayout from "./features/auth/Layouts/AuthLayout";
import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";
import Google from "./features/auth/pages/Google";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Portfolio from "./features/portfolio/pages/Portfolio";
import Watchlist from "./features/watchlist/pages/Watchlist";
import Profile from "./features/profile/pages/Profile";
import AssetDetails from "./shared/pages/AssetDetails";
import AppLayout from "./shared/layouts/AppLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "auth",
        element: <AuthLayout />,
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
        path: "app",
        element: <AppLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "details/:symbol",
                        element: <AssetDetails />
                    }
                ]
            },
            {
                path: "portfolio",
                element: <Portfolio />,
                children: [
                    {
                        path: "details/:symbol",
                        element: <AssetDetails />
                    }
                ]
            },
            {
                path: "watchlist",
                element: <Watchlist />,
                children: [
                    {
                        path: "details/:symbol",
                        element: <AssetDetails />
                    }
                ]
            },
            {
                path: "profile",
                element: <Profile />,
                children: [
                    {
                        path: "details/:symbol",
                        element: <AssetDetails />
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        element: <div>404 Not Found</div>
    }
]);

export default router;