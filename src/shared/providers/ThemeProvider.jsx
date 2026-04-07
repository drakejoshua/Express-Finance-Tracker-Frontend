// ThemeProvider.jsx
// This file defines a ThemeProvider component that manages the theme state
// of the application (light or dark) and provides a toggleTheme function to
// switch between themes. The ThemeProvider uses React's Context API to share
// the theme state and toggle function across the application, allowing any
// component to access the current theme and toggle it as needed.

// import necessary dependencies
import { createContext, useState, useEffect, useContext } from 'react';

// create a context for the theme
export const ThemeContext = createContext();

// Custom hook to access the theme context
export function useTheme() {
    return useContext(ThemeContext);
}

export const ThemeProvider = ({ children }) => {
    // initialize the theme state with the user's preference or the 
    // system preference
    const [theme, setTheme] = useState( function() {
        // retrieve the user's theme preference based on browser preference
        const browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light" 

        // retrieve the user's theme preference from localStorage, if it exists,
        const localStorageTheme = localStorage.getItem("green-finance-theme")

        // check if the user has a theme preference saved in localStorage, if not, 
        // use the browser preference as the initial theme
        if ( localStorageTheme ) {
            return localStorageTheme
        } else {
            return browserTheme
        }
    });

    // update the theme class on the root element and save the preference to 
    // localStorage whenever the theme state changes
    useEffect( function() {
        if ( theme === "dark" ) {
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
        }

        localStorage.setItem( "green-finance-theme", theme )
    }, [ theme ])

    // toggleTheme function to toggle between light and dark themes
    // by updating the theme state
    function toggleTheme() {
        setTheme( ( prevTheme ) => ( prevTheme === "dark" ) ? "light" : "dark" )
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};