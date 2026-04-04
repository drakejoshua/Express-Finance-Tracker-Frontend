import { Outlet } from "react-router-dom";

export default function TwoColumnLayout() {
  return (
    <div className="two-column-layout">
        <div className="left-column">
            <h1>Welcome to Our App</h1>
            <p>Manage your finances with ease and confidence.</p>

        </div>
        <div className="right-column">
            <Outlet />
        </div>
    </div>
  )
}