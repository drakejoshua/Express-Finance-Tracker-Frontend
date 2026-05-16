// import createBrowserRouter from react-router-dom to 
// define the application's routes and their corresponding 
// actions and loaders
import { createBrowserRouter } from "react-router-dom";

// import the components for each route in the application
import Landing from "./features/landing/pages/Landing";
import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";
import Google from "./features/auth/pages/Google";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Portfolio from "./features/portfolio/pages/Portfolio";
import Profile from "./features/profile/pages/Profile";
import AssetDetails from "./shared/pages/AssetDetails";

// import the layouts for grouping route in the application
import AuthLayout from "./features/auth/Layouts/AuthLayout";
import AppLayout from "./shared/layouts/AppLayout";

// import the loaders and actions for the routes in the application
import { searchCoinsAction } from "./shared/actions/searchCoinsAction.jsx"
import RouteError from "./shared/components/RouteError.jsx";
import { getCoinDetailsLoader } from "./shared/loaders/getCoinDetailsLoader.jsx";
import Watchlist from "./features/watchlist/pages/Watchlist.jsx";
import { watchlistAction } from "./features/watchlist/services/watchlistAction.jsx";
import { getWatchlistDataLoader } from "./features/watchlist/services/getWatchlistDataLoader.jsx";
import NotFound from "./shared/pages/NotFound.jsx";
import App from "./App.jsx";
import AppError from "./shared/components/AppError.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Landing />,
                errorElement: <AppError />
            },
            {
                path: "auth",
                element: <AuthLayout />,
                errorElement: <AppError />,
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
                errorElement: <AppError />,
                children: [
                    {
                        index: true,
                        element: <Watchlist />,
                        action: watchlistAction,
                        loader: getWatchlistDataLoader,
                    },
                    {
                        path: "dashboard",
                        element: <Watchlist />,
                        action: watchlistAction,
                        loader: getWatchlistDataLoader,
                        children: [
                            {
                                path: "details/:symbol",
                                element: <AssetDetails />,
                                loader: getCoinDetailsLoader
                            }
                        ]
                    },
                    {
                        path: "profile",
                        element: <Profile />,
                        children: [
                            {
                                path: "details/:symbol",
                                element: <AssetDetails />,
                                loader: getCoinDetailsLoader
                            }
                        ]
                    }
                ],
                action: searchCoinsAction
            },
            {
                path: "*",
                element: <NotFound />,
                errorElement: <AppError />
            }
        ]
    }
]);

export default router;