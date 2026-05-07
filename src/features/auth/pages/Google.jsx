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
    const [ loading, setLoading ] = useState( true )
    const { theme } = useTheme()
    const [ errorText, setErrorText ] = useState( "" )

    const [ searchParams, setSearchParams ] = useSearchParams()
    const navigateTo = useNavigate()

    const { getCurrentUser } = useAuthProvider()

    async function verifyGoogleAccount() {
        const accessToken = searchParams.get( "hash" )

        if ( !accessToken ) {
            setErrorText( "Invalid account identifier encountered." )
        }

        try {
            const { status, error } = await getCurrentUser( accessToken )

            if ( status === "error" ) {
                setLoading( false )
                setErrorText( error.message )
            } else {
                // redirect user to dashboard after a short delay to 
                // allow them to see the toast message
                setTimeout( function() {
                    navigateTo( "/app/dashboard" )
                }, 1500 ) // 1.5s second delay before redirecting
            }
        } catch ( error ) {
            setLoading( false )
            setErrorText( error.message )
        } finally {
            setLoading( false )
        }
    }

    useEffect( () => {
        verifyGoogleAccount()
    }, [] )

    return (
        <>
            <AuthHeading
                className="
                    mt-12 lg:mt-14
                "
            >
                Hold on, We're verifying your Google account
            </AuthHeading>

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
                {/* loading state */}
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

                {/* error state */}
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

                {/* loaded state */}
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
                        onClick={ () => navigateTo( "/" ) }
                    >
                        Go to Dashboard
                    </Button>
                </div>}
            </div>
        </>
    )
}
