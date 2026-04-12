import { FaArrowRotateLeft, FaTriangleExclamation } from 'react-icons/fa6'
import Button from './Button'

export default function RouteError({ title, message, handleRetry }) {
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
                    text-red-500
                    text-4xl
                "
            />

            <h1
                className="
                    text-2xl
                    mt-4
                "
            >
                { title }
            </h1>

            <p
                className="
                    mt-2
                "
            >
                { message }
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
                "
                onClick={ handleRetry }
            >
                <FaArrowRotateLeft 
                    className="
                        group-hover:-rotate-360
                        transition-transform
                        duration-600
                    "
                />
                Retry
            </Button>
        </div>
    )
}
