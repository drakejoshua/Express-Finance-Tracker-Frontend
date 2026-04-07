import React from "react";
import { useTheme } from "../providers/ThemeProvider";
import { FaMoon, FaRegSun } from "react-icons/fa6";

const ThemeButton = React.forwardRef( function({ className, ...props }, ref ) {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            className={`
                text-gray-600
                text-2xl
                ${ className }
            `}
            onClick={ () => toggleTheme() }
            {...props}
            ref={ ref }
        >
            { theme == 'dark' && <FaRegSun/> }
            { theme == 'light' && <FaMoon/>}
        </button>
    )
})

export default ThemeButton