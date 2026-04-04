import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
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