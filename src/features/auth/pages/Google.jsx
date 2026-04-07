import { useState } from 'react'
import AuthHeading from '../components/AuthHeading.jsx'
import { ScaleLoader } from 'react-spinners'
import { FaCircleCheck, FaTriangleExclamation } from 'react-icons/fa6'
import Button from '../../../shared/components/Button'
import colors from 'tailwindcss/colors';
import { useTheme } from '../../../shared/providers/ThemeProvider'

export default function Google() {
    const [ loading, setLoading ] = useState( true )
    const { theme } = useTheme()

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
                <div
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
                </div>

                {/* error state */}
                {/* <div>
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
                            Oops! Something went wrong during verification. Please try again.
                        </span>
                    </div>

                    <Button
                        className="mt-6"
                    >
                        Retry Verification
                    </Button>
                </div> */}

                {/* loaded state */}
                {/* <div>
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
                    >
                        Go to Dashboard
                    </Button>
                </div> */}
            </div>
        </>
    )
}
