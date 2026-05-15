import { Outlet } from "react-router-dom";

function App() {
    return (
        <div 
            className="
                h-screen 
                overflow-auto 
                dark:bg-gray-800 
                bg-white
            "
        >
            <Outlet />
        </div>
    )
}

export default App
