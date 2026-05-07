import { Form } from 'radix-ui'
import { FaGoogle } from 'react-icons/fa6'
import { useState } from 'react'
import EmailField from '../../../shared/components/EmailField.jsx'
import PasswordField from '../../../shared/components/PasswordField.jsx'
import Button from '../../../shared/components/Button'
import AltButton from '../../../shared/components/AltButton'
import { Link, useNavigate } from 'react-router-dom'
import AuthHeading from '../components/AuthHeading'
import AuthForm from '../components/AuthForm'
import { useAuthProvider } from '../../../shared/providers/AuthProvider.jsx'
import { useDialogProvider } from '../../../shared/providers/DialogProvider.jsx'
import { useToastProvider } from '../../../shared/providers/ToastProvider.jsx'
import handleOpenDialog from '../../../shared/utils/handleOpenDialog.jsx'
import { ERROR_CODES } from '../../../shared/utils/errors.js'
import GoogleButton from '../components/GoogleButton.jsx'

export default function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const { logIn } = useAuthProvider()
    const { openDialog, closeDialog } = useDialogProvider()
    const { showToast } = useToastProvider()
    const navigateTo = useNavigate()

    const [ loading, setLoading ] = useState( false )

    async function handleLogin( e ) {
        // prevent form submission default behaviour i.e.
        // browser refreshing the page on form submit
        e.preventDefault()

        // set form loading state to show login submission
        // in progress to user
        setLoading( true )

        try {
            // send login request to backend for user using their submitted email and password
            const { status, error } = await logIn( email, password )

            // check request status for errors
            if ( status === "error" ) {
                // if request was unsuccessful, alert user with a dialog
                // stating the error encountered
                switch ( error.code ) {
                    case ERROR_CODES.EMAIL_NOT_FOUND:
                        handleOpenDialog( "Email Not Found", error.message, openDialog, closeDialog )
                    break

                    case ERROR_CODES.INVALID_PASSWORD:
                        handleOpenDialog( "Invalid Password", error.message, openDialog, closeDialog )
                    break

                    case ERROR_CODES.INVALID_EMAIL_AUTHENTICATION_METHOD:
                        handleOpenDialog( "Invalid Authentication Method", error.message, openDialog, closeDialog )
                    break

                    default:
                        handleOpenDialog( "Login Error", error.message, openDialog, closeDialog )
                }
            } else {
                // if request is successful, alert user with a toast stating
                // login success and they will be redirected soon
                showToast({
                    type: "success",
                    message: `Login successful, You will be redirected shortly`
                })

                // redirect user to dashboard after a short delay to 
                // allow them to see the toast message
                setTimeout( function() {
                    navigateTo( "/app/dashboard" )
                }, 1500 ) // 1.5s second delay before redirecting
            }
        } catch( error ) {
            // if any errors were encounted during the entire process
            // of login, alert user with a dialog stating the error encountered
            handleOpenDialog( "Login Error", error.message, openDialog, closeDialog )
        } finally {
            // reset form loading state
            setLoading( false )

            // clear password field for security and 
            // user experience reasons
            setPassword("")
        }
    }


    return (
        <>
            <AuthHeading
                className="
                    mt-12 lg:mt-14
                "
            >
                Sign in to your account
            </AuthHeading>

            <p
                className='
                    mt-4
                '
            >
                Please sign in to your account 
                to access your dashboard and manage your finances effectively.
            </p>

            {/* Login Form */}
            <AuthForm
                className="
                    mt-6
                "
                onSubmit={ handleLogin }
            >
                <EmailField
                    name={"email"}
                    label={"Email"}
                    value={ email }
                    placeholder={"Enter your email"}
                    onChange={ (e) => setEmail( e.target.value ) }
                    emptyValidationMessage={"Please enter your email address."}
                    invalidValidationMessage={"Please enter a valid email address."}
                />

                <PasswordField
                    name={"password"}
                    label={"Password"}
                    value={ password }
                    placeholder={"Enter your password"}
                    onChange={ (e) => setPassword( e.target.value ) }
                    emptyValidationMessage={"Please enter your password."}
                    invalidValidationMessage={"Your password should be longer than 6 characters."}
                />

                <Form.Submit asChild>
                    <Button
                        className={`
                            mt-4
                            ${ loading ? "cursor-not-allowed opacity-70" : "" }
                        `}
                    >
                        { loading ? "Signing you in..." : "Sign in" }
                    </Button>
                </Form.Submit>
            </AuthForm>

            {/* sign in with google button */}
            <GoogleButton 
                text="Sign in with Google"
            />

            {/* redirect to signup link */}
            <Link
                to="/auth/signup"
                className='
                    block
                    mt-6 mb-8
                    text-center
                    mx-auto
                    w-fit
                    underline
                '
            >
                Don't have an account? Sign up 
            </Link>
        </>
    )
}
