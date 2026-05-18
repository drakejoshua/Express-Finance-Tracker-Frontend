/* 
    RouteError.jsx

    This component represents a error message container that can be 
    displayed when an error occurs while loading a page or route. It 
    accepts a title, message, and handleRetry function as props. The 
    component uses the useAsyncError hook from react-router-dom to 
    access the error object and display its message in the UI. It also 
    includes a retry button that calls the handleRetry function when clicked, 
    allowing the user to attempt to reload the page or route after an error 
    has occurred.
*/



// import necessary dependencies and components
import { FaArrowRotateLeft, FaTriangleExclamation } from 'react-icons/fa6'
import Button from './Button'
import { useAsyncError } from 'react-router-dom'
import { useState } from 'react'


export default function RouteError({ title, message, handleRetry }) {
    // get the error object from the useAsyncError hook to access 
    // the error message, and initialize state to track if the retry 
    // button has been clicked
    const error = useAsyncError()
    const [ isRetrying, setIsRetrying ] = useState( false )

    return (
        <div
            className="
                flex
                flex-col
                items-center
                text-center
                p-6 py-20
            "
        >
            {/* error icon */}
            <FaTriangleExclamation 
                className="
                    text-red-500 dark:text-red-300
                    text-4xl
                "
            />

            {/* error title */}
            <h1
                className="
                    text-2xl
                    mt-4
                    dark:text-white
                "
            >
                { title }
            </h1>

            {/* error message */}
            <p
                className="
                    mt-2
                    dark:text-white
                    lg:w-1/2 md:w-3/4 w-full
                "
            >
                { message } Error: { error.message }
            </p>

            {/* retry button */}
            <Button
                className="
                    mt-6
                    capitalize
                    px-5 py-2
                    rounded-full
                    flex
                    gap-2
                    items-center
                    group
                    w-min
                    disabled:cursor-not-allowed
                    disabled:pointer-events-none
                    disabled:opacity-50
                    group
                "
                onClick={ () => {
                    setIsRetrying( true )
                    handleRetry()
                } }
                disabled={ isRetrying }
            >
                <FaArrowRotateLeft 
                    className="
                        group-hover:-rotate-360
                        transition-transform
                        duration-600
                        group-disabled:animate-spin
                        group-disabled:duration-1500
                    "
                />
                { isRetrying ? "Retrying..." : "Retry" }
            </Button>
        </div>
    )
}
