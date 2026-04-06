import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";

function App() {
    return (
        <div className="h-screen overflow-auto dark:bg-gray-900 bg-white">
            <RouterProvider router={router} />
        </div>
    )
}

export default App
