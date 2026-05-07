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
            "
            onClick={ handleGoogleAuth }
        >
            <FaGoogle/>
            { text }
        </AltButton>
    )
}
