// AltButton.jsx
// This component is a reusable button component for alternative actions,
// such as signing in with Google. It provides consistent styling for
// buttons that are not the primary call-to-action in the authentication flow.
import React from "react";

const AltButton = React.forwardRef( function( { className, children, ...props }, ref ) {
    return (
        <button
            className={`
                w-full
                p-2
                border
                rounded
                flex
                gap-2
                font-medium
                items-center
                justify-center
                bg-gray-800  dark:bg-gray-100
                hover:bg-gray-700  dark:hover:bg-gray-200
                [&]:text-white [&]:dark:text-gray-800
                ${ className }
            `}
            { ...props }
            ref={ ref }
        >
            { children }
        </button>
    )
})


export default AltButton