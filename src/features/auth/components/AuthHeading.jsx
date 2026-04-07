import React from "react";

const AuthHeading = React.forwardRef( function( { className, children, ...props }, ref ) {
    return (
        <h1
            className={`
                text-3xl
                font-medium
                capitalize
                ${ className }
            `}
            { ...props }
            ref={ref}
        >
            { children }
        </h1>
    )
})

export default AuthHeading;