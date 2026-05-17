/* 
    Landing.jsx

    This is the landing page of our application, which serves as the
    entry point for users. It welcomes users to our platform and provides
    a brief introduction to our services. The page includes a brand logo,
    a welcome message, and buttons for users to sign up or log in to their
    accounts. It also includes a theme toggle button for users to switch
    between light and dark modes. The landing page is designed to be simple
    and user-friendly, guiding users towards creating an account or logging in
    to access the full features of the application.
*/

// import required dependencies and components
import { useNavigate } from "react-router-dom"
import Logo from "../../../shared/components/Logo.jsx"
import Button from "../../../shared/components/Button.jsx"
import AltButton from "../../../shared/components/AltButton.jsx"
import ThemeButton from "../../../shared/components/ThemeButton.jsx"



export default function Landing() {
    // get navigate function from react router to redirect 
    // user to login or signup page
    const navigateTo = useNavigate()

    return (
        <div
            className="
                py-16
                px-2
                w-9/10
                max-w-4xl
                mx-auto
            "
        >
            {/* title */}
            <h1 
                className="
                    text-xl lg:text-3xl
                    font-medium
                    text-center
                    text-gray-700 dark:text-white
                "
            >
                Welcome to 
            </h1>

            {/* logo */}
            <Logo 
                className="
                    h-auto
                    mt-4
                "
            />

            {/* description */}
            <p 
                className="
                    mt-8
                    text-center
                    md:max-w-xl lg:max-w-2xl
                    mx-auto
                    lg:text-lg
                    dark:text-white
                "
            >
                The landing page is still under construction, 
                but you can sign up or log in to access the full 
                features of our application. we provide a seamless 
                experience for tracking your crypto assets in any currency, 
                and we are constantly working to improve our platform to 
                meet your needs.
            </p>

            {/* action buttons */}
            <div 
                className="
                    mt-8 lg:mt-12
                    flex
                    gap-4
                    w-fit
                    mx-auto
                "
            >
                {/* sign up button */}
                <Button
                    className="
                        px-6
                    "
                    onClick={() => navigateTo("/auth/signup")}
                >
                    Sign up
                </Button>

                {/* log in button */}
                <AltButton
                    className="
                        px-6
                    "
                    onClick={() => navigateTo("/auth/login")}
                >
                    Log in
                </AltButton>

                {/* theme toggle button */}
                <ThemeButton/>
            </div>
        </div>
    )
}
