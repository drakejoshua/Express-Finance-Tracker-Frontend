// Logo.jsx
// This component is responsible for rendering the application's logo. 
// It switches between a light and dark version of the logo based on the current theme,
// ensuring that the logo remains visible and consistent with the overall design of the application.
import React from "react";
import LogoWhite from '../../assets/Brand/GreenFinanceLogoWhite.svg'
import LogoBlack from '../../assets/Brand/GreenFinanceLogoBlack.svg'
import { useTheme } from "../providers/ThemeProvider";

const Logo = React.forwardRef(({ ...props }, ref) => {
    const { theme } = useTheme()

    return (
        <img
            src={ ( theme == "dark" ) ? LogoBlack : LogoWhite }
            ref={ref}
            {...props}
         />
    )
})


export default Logo