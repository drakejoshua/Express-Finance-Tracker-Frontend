/* 
    Google.jsx

    This page is the landing page for users who are redirected back to the frontend
    after authenticating with Google. It is responsible for verifying the Google account
    using the access token provided in the URL, and then redirecting the user to the dashboard
    if the verification is successful. It also handles loading and error states during the 
    verification process.
*/


// import required dependencies and components
import { useEffect, useState } from 'react'
import AuthHeading from '../components/AuthHeading.jsx'
import { ScaleLoader } from 'react-spinners'
import { FaCircleCheck, FaTriangleExclamation } from 'react-icons/fa6'
import Button from '../../../shared/components/Button'
import colors from 'tailwindcss/colors';
import { useTheme } from '../../../shared/providers/ThemeProvider'
import { useAuthProvider } from '../../../shared/providers/AuthProvider.jsx'
import { useNavigate, useSearchParams } from 'react-router-dom'



export default function Google() {
    // loading and error states to indicate if the 
    // verification process is ongoing and any errors encountered
    const [ loading, setLoading ] = useState( true )
    const [ errorText, setErrorText ] = useState( "" )
    
    // get theme from theme provider to set loader color based 
    // on current theme
    const { theme } = useTheme()

    // get search params from url to extract access token and 
    // navigate function to redirect user after verification
    const [ searchParams, setSearchParams ] = useSearchParams()
    const navigateTo = useNavigate()

    // get getCurrentUser function from auth provider to 
    // verify google account using access token
    const { getCurrentUser } = useAuthProvider()

    // verifyGoogleAccount()
    // This function is responsible for verifying the user's Google account 
    // using the access token provided in the URL. It makes an API call to 
    // the backend to verify the token and retrieve the user's information. 
    // Based on the response, it updates the loading and error states, and 
    // redirects the user to the dashboard if the verification is successful.
    async function verifyGoogleAccount() {
        // extract access token from url search params
        const accessToken = searchParams.get( "hash" )

        // if no access token is found in the url, set an error 
        // message and stop loading
        if ( !accessToken ) {
            setLoading( false )
            setErrorText( "Invalid account identifier encountered." )
            return
        }

        try {
            // make API call to backend to verify google account using access token
            const { status, error } = await getCurrentUser( accessToken )

            // check if there was an error during verification and 
            // update states accordingly
            if ( status === "error" ) {
                setErrorText( error.message )
            } else {
                // redirect user to dashboard after a short delay to 
                // allow them to see the toast message
                setTimeout( function() {
                    navigateTo( "/app/dashboard" )
                }, 1500 ) // 1.5s second delay before redirecting
            }
        } catch ( error ) {
            // catch any unexpected errors during the verification process and
            // update states accordingly
            setErrorText( error.message )
        } finally {
            // stop loading once the verification process is complete, 
            // regardless of the outcome
            setLoading( false )
        }
    }


    // useEffect to run the verifyGoogleAccount function when the 
    // page mounts
    useEffect( () => {
        verifyGoogleAccount()
    }, [] )

    return (
        <>
            {/* heading */}
            <AuthHeading
                className="
                    mt-12 lg:mt-14
                "
            >
                Hold on, We're verifying your Google account
            </AuthHeading>

            {/* sub text */}
            <p
                className='
                    mt-4
                '
            >
                Please wait while we complete the verification to 
                ensure a secure and seamless experience.
            </p>

            <div
                className='
                    mt-12
                '
            >
                {/* loading UI */}
                { ( loading && !errorText ) && <div
                    className='
                        flex
                        gap-6
                    '
                >
                    <ScaleLoader
                        color={ theme == "light" ? colors.gray['800'] : colors.white }
                        loading={ loading }
                        size={100}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />

                    <span
                        className='
                            font-medium
                        '
                    >
                        Verifying your account, this may take a moment...
                    </span>
                </div>}

                {/* error UI */}
                { ( !loading && errorText ) &&<div>
                    <div
                        className='
                            flex
                            gap-6
                            items-center
                        '
                    >
                        <FaTriangleExclamation
                            className='
                                text-red-700 dark:text-red-300
                                text-4xl
                                shrink-0
                            '
                        />

                        <span
                            className='
                                font-medium
                                text-red-700 dark:text-red-300
                            '
                        >
                            There was an error verifying your google account. Error: { errorText }
                        </span>
                    </div>

                    <Button
                        className="mt-6 px-4"
                        onClick={ () => navigateTo( "/auth/login" ) }
                    >
                        Back to Login
                    </Button>
                </div>}

                {/* loaded UI */}
                { ( !loading && !errorText ) && <div>
                    <div
                        className='
                            flex
                            gap-6
                            items-center
                        '
                    >
                        <FaCircleCheck
                            className='
                                text-green-700 dark:text-green-500
                                text-4xl
                                shrink-0
                            '
                        />

                        <span
                            className='
                                font-medium
                            '
                        >
                            Verification Successful!
                            You will be redirected to the dashboard shortly. If not, 
                            click the button below.
                        </span>
                    </div>

                    <Button
                        className="mt-6"
                        onClick={ () => navigateTo( "/app/dashboard" ) }
                    >
                        Go to Dashboard
                    </Button>
                </div>}
            </div>
        </>
    )
}
