// ThemeButton.jsx
// This component is a reusable button component for toggling between light and dark themes.
// It uses the useTheme hook to access the current theme and toggle function, allowing users
// to switch themes with a single click. The button displays a sun icon for light mode and
// a moon icon for dark mode, providing a clear visual indication of the current theme.
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