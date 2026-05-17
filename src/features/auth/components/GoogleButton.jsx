/* 
    GoogleButton.jsx

    This component renders a button that allows users to authenticate 
    using their Google account. When clicked, it redirects the user 
    to the backend route that initiates the Google OAuth flow.
*/

import { FaGoogle } from "react-icons/fa6";
import AltButton from "../../../shared/components/AltButton";


export default function GoogleButton({ text }) {
    const backendURL = import.meta.env.VITE_BACKEND_URL

    function handleGoogleAuth() {
        // redirect user to backend route that initiates google oauth flow
        window.open( `${ backendURL }/auth/google`, "_self" )
    }

    return (
        <AltButton
            className="
                mt-4
                w-full
            "
            onClick={ handleGoogleAuth }
        >
            <FaGoogle/>
            { text }
        </AltButton>
    )
}
