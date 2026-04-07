// AuthHeading.jsx
// This component is a reusable heading component for authentication pages,
// such as login and signup. It provides consistent styling for headings
// across the authentication flow.
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