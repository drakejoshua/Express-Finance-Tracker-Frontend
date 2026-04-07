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