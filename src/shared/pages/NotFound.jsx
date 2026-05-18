/* 
    NotFound.jsx

    This is the 404 page of the application, this page displays the error
    message that the resource or page the user was looking for couldn't be 
    found
*/



// import required dependencies and components
import React from 'react'
import Logo from '../components/Logo'
import Button from '../components/Button'
import ThemeButton from '../components/ThemeButton'
import { FaArrowLeft } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'


export default function NotFound() {
    // get the navigate function from the useNavigate() hook
    // of react-router to programmatically navigate in our code
    const navigateTo = useNavigate()

    return (
        // page container
        <div
            className="
                w-9/10
                mx-auto
                max-w-130
                py-16
                px-2
            "
        >
            <div 
                className="
                    flex
                    items-center
                    gap-3
                    justify-center
                "
            >
                {/* logo */}
                <Logo 
                    className="
                        h-6 lg:h-8
                        w-auto
                    "
                />

                {/* theme toggle button */}
                <ThemeButton 
                    className="
                        text-xl
                    "
                />
            </div>

            {/* heading */}
            <h1 
                className="
                    text-[6rem] lg:text-[12rem]
                    text-center
                    font-medium
                    text-gray-800 dark:text-white
                    opacity-80 dark:opacity-100
                    
                "
            >
                404
            </h1>

            {/* description */}
            <p 
                className="
                    text-center
                    dark:text-white
                    lg:text-lg
                    -mt-6
                "
            >
                The page you are looking for does not exist. 
                Please check the URL or return to the homepage.
            </p>

            {/* page CTA - go back home button */}
            <Button
                className="
                    mt-8
                    px-4
                    mx-auto
                    flex
                    items-center
                    gap-2
                "
                onClick={() => navigateTo('/')}
            >
                <FaArrowLeft />
                Go Back Home
            </Button>
        </div>
    )
}
