// Button.jsx
// This component is a reusable button component for primary actions,
// such as submitting a form. It provides consistent styling for
// buttons that are the main call-to-action in the authentication flow.
import React from "react";

const Button = React.forwardRef(({ children, className, ...props }, ref) => {
    return (
        <button
            className={`
                w-full
                p-2
                font-medium
                bg-green-600
                text-white 
                rounded
                hover:bg-green-700 dark:hover:bg-gray-600
                ${ className }
            `}
            ref={ref}
            {...props}
        >
            { children }
        </button>
    )
})

export default Button