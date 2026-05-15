import { FaArrowRotateLeft, FaTriangleExclamation } from 'react-icons/fa6'
import Button from './Button'
import { useAsyncError } from 'react-router-dom'
import { useState } from 'react'

export default function RouteError({ title, message, handleRetry }) {
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
            <FaTriangleExclamation 
                className="
                    text-red-500 dark:text-red-300
                    text-4xl
                "
            />

            <h1
                className="
                    text-2xl
                    mt-4
                    dark:text-white
                "
            >
                { title }
            </h1>

            <p
                className="
                    mt-2
                    dark:text-white
                    lg:w-1/2 md:w-3/4 w-full
                "
            >
                { message } Error: { error.message }
            </p>

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
