import React from 'react'
import { useRouteError } from 'react-router-dom'
import Logo from './Logo'
import ThemeButton from './ThemeButton'

export default function AppError() {
    const error = useRouteError()

    return (
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
                <Logo 
                    className="
                        h-6 lg:h-8
                        w-auto
                    "
                />

                <ThemeButton 
                    className="
                        text-xl
                    "
                />
            </div>

            <h1 
                className="
                    text-[6rem] lg:text-[10rem]
                    text-center
                    font-medium
                    text-gray-800 dark:text-white
                    opacity-80 dark:opacity-100
                    
                "
            >
                Oops!
            </h1>

            <p 
                className="
                    text-center
                    dark:text-white
                    lg:text-lg
                    mt-4
                "
            >
                An error occurred while loading the page.
                You can view the error details below, Try refreshing the page 
                or return to the homepage to try that action again.
            </p>

            {/* error message */}
            <div 
                className="
                    font-mono
                    p-4
                    dark:bg-black bg-gray-700
                    text-white
                    rounded-lg
                    mt-8
                "
            >
                { error.message}
            </div>
        </div>
    )
}
