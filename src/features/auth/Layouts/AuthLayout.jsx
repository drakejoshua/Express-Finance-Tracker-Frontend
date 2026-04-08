import { Outlet } from "react-router-dom";
import 'animate.css';
import ThemeButton from "../../../shared/components/ThemeButton";
import Logo from "../../../shared/components/Logo";

export default function AuthLayout() {
    return (
        // use grid layout to create 2 columns, one for the auth content
        // and one for the image on the side
        <div className="auth-layout h-full xl:grid grid-cols-[1fr_2fr] grid-flow-col">
            {/* Auth content */}
            <div
                className='
                    h-full
                    p-6 lg:p-8
                    pt-20 lg:pt-14
                    w-full
                    max-w-100 md:max-w-120 xl:max-w-max
                    mx-auto
                    relative
                    overflow-auto
                    *:text-gray-800 dark:*:text-white
                '
            >
                {/* Brand Logo */}
                <Logo
                    className="
                        w-44 lg:w-40
                        h-auto
                    "
                />

                {/* Auth Content Insertion Point */}
                <Outlet />

                {/* theme toggle button */}
                <ThemeButton
                    className="
                        absolute
                        top-8
                        right-6
                    "
                />
            </div>

            {/* Image content */}
            <div 
                className="
                    bg-[url('/public/liquid-cheese.svg')] bg-cover relative hidden lg:block
                    overflow-hidden
                "
            ></div>
        </div>
    )
}