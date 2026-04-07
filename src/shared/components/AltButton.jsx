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