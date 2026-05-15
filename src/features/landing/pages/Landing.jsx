import { useNavigate } from "react-router-dom"
import Logo from "../../../shared/components/Logo.jsx"
import Button from "../../../shared/components/Button.jsx"
import AltButton from "../../../shared/components/AltButton.jsx"
import ThemeButton from "../../../shared/components/ThemeButton.jsx"

export default function Landing() {
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

            <Logo 
                className="
                    h-auto
                    mt-4
                "
            />

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

            <div 
                className="
                    mt-8 lg:mt-12
                    flex
                    gap-4
                    w-fit
                    mx-auto
                "
            >
                <Button
                    className="
                        px-6
                    "
                    onClick={() => navigateTo("/auth/signup")}
                >
                    Sign up
                </Button>

                <AltButton
                    className="
                        px-6
                    "
                    onClick={() => navigateTo("/auth/login")}
                >
                    Log in
                </AltButton>

                <ThemeButton/>
            </div>
        </div>
    )
}
