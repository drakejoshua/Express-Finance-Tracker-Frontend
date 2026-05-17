/* 
    Signup.jsx

    This page contains the signup form for new users to create an account
    using their email, password, and other optional details. It handles form
    submission, displays loading and error states, and provides feedback to the user
    through dialogs and toasts. It also includes a button for users to sign up
    with their Google account, which redirects them to the Google authentication flow.
*/


// import required dependencies and components
import { Form } from 'radix-ui'
import EmailField from '../../../shared/components/EmailField.jsx'
import { useState } from 'react'
import PasswordField from '../../../shared/components/PasswordField.jsx'
import Button from '../../../shared/components/Button'
import AltButton from '../../../shared/components/AltButton'
import { FaGoogle } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import AuthHeading from '../components/AuthHeading.jsx'
import TextField from '../../../shared/components/TextField.jsx'
import AuthForm from '../components/AuthForm.jsx'
import { useAuthProvider } from '../../../shared/providers/AuthProvider.jsx'
import { useDialogProvider } from '../../../shared/providers/DialogProvider.jsx'
import { useToastProvider } from '../../../shared/providers/ToastProvider.jsx'
import handleOpenDialog from '../../../shared/utils/handleOpenDialog.jsx'
import { ERROR_CODES } from '../../../shared/utils/errors.js'
import GoogleButton from '../components/GoogleButton.jsx'



export default function Signup() {
    // form states for email, password, firstname, lastname 
    // and profile photo fields
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ selectedFile, setSelectedFile ] = useState( null )

    // get signUp helper function from auth provider
    // to handle signup logic and state management related 
    // to user authentication
    const { signUp } = useAuthProvider()

    // get dialog and toast provider functions to show 
    // dialogs and toasts
    const { openDialog, closeDialog } = useDialogProvider()
    const { showToast } = useToastProvider()

    // get navigate function from react router to
    // redirect user after successful signup
    const navigateTo = useNavigate()

    // loading state to indicate if the signup submission is in progress
    const [ loading, setLoading ] = useState( false )


    // handleSignup()
    // This function is responsible for handling the signup form 
    // submission. It prevents the default form submission behavior, 
    // sets the loading state, and calls the signUp function from the 
    // auth provider with the user's details. Based on the response, 
    // it shows appropriate dialogs or toasts to the user and redirects 
    // them to the dashboard if the signup is successful. It also handles 
    // any errors that may occur during the process and resets the loading 
    // state and form fields at the end.
    async function handleSignup( e ) {
        // prevent form submission default behaviour i.e.
        // browser refreshing the page on form submit
        e.preventDefault()

        // set form loading state to show signup submission
        // in progress to user
        setLoading( true )
        
        try {
            // send signup request to backend for new user using their
            // submitted details 
            const { status, error } = await signUp( email, password, firstName, lastName, selectedFile )

            // check request status for errors
            if ( status === "error" ) {
                // if request was unsuccessful, alert user with a dialog
                // stating the error encountered
                if ( error.code == ERROR_CODES.EMAIL_EXISTS ) {
                    handleOpenDialog( "Email Already Exists", error.message, openDialog, closeDialog )
                } else {
                    handleOpenDialog( "Signup Error", error.message, openDialog, closeDialog )
                }
            } else {
                // if request is successful, alert user with a toast stating
                // account creation success and they will be redirected soon
                showToast({
                    type: "success",
                    message: `Signup successful, Your account has been created. 
                    You will be redirected shortly`
                })

                // redirect user to dashboard after a short delay to 
                // allow them to see the toast message
                setTimeout( function() {
                    navigateTo( "/app/dashboard" )
                }, 1500 ) // 1.5s second delay before redirecting
            }
        } catch( error ) {
            // if any errors were encounted during the entire process
            // of signup, alert user with a dialog stating the error encountered
            handleOpenDialog( "Signup Error", error.message, openDialog, closeDialog )
        } finally {
            // reset form loading state
            setLoading( false )

            // clear form state
            setEmail("")
            setPassword("")
            setFirstName("")
            setLastName("")
            setSelectedFile( null )
        }
    }

    return (
        <>
            {/* heading */}
            <AuthHeading
                className="
                    mt-12 lg:mt-14
                "
            >
                Create an account
            </AuthHeading>

            {/* sub-text */}
            <p
                className='
                    mt-4
                '
            >
                Sign up for a new account with GreenFinance. We help
                you manage your finances with precision and tracking
            </p>

            {/* signup form */}
            <AuthForm
                className="
                    mt-6
                "
                onSubmit={ handleSignup }
            >
                <div
                    className='
                        grid
                        gap-4
                        grid-cols-2
                    '
                >
                    {/* firstname input */}
                    <TextField
                        label="Firstname"
                        minLength="3"
                        required
                        value={ firstName }
                        onChange={ ( e ) => setFirstName( e.target.value ) }
                        emptyValidationMessage='Your firstname is required for signup'
                        tooShortValidationMessage='Please enter a valid firstname'
                    />
                    
                    {/* lastname input */}
                    <TextField
                        label="Lastname"
                        value={ lastName }
                        onChange={ ( e ) => setLastName( e.target.value ) }
                    />
                </div>

                {/* email input */}
                <EmailField
                    name={"email"}
                    label={"Email"}
                    value={ email }
                    placeholder={"Enter your email"}
                    onChange={ (e) => setEmail( e.target.value ) }
                    emptyValidationMessage={"Please enter an email address."}
                    invalidValidationMessage={"Please enter a valid email address."}
                />

                {/* password input */}
                <PasswordField
                    name={"password"}
                    label={"Password"}
                    value={ password }
                    placeholder={"Enter your password"}
                    onChange={ (e) => setPassword( e.target.value ) }
                    emptyValidationMessage={"Please enter a password. Minimum 6 characters."}
                    invalidValidationMessage={"Your password should be at least 6 characters long."}
                />

                {/* profile photo field */}
                <Form.Field
                    className='
                        flex
                        flex-col
                        gap-2
                    '
                >
                    {/* profile photo label */}
                    <Form.Label
                        className='
                            font-medium
                        '
                    >
                        Profile Photo ( optional ):
                    </Form.Label>

                    {/* profile photo input */}
                    <Form.Control asChild>
                        <input
                            type='file'
                            className='
                                border-gray-600 dark:border-gray-50
                                dark:bg-gray-200
                                dark:placeholder:text-gray-500
                                dark:text-gray-900
                                border-2
                                w-full
                                p-2 px-3
                                rounded
                            '
                            accept='image/*'
                            onChange={ ( e ) => setSelectedFile( e.target.files[0] ) }
                        />
                    </Form.Control>

                    {/* preview of selected profile photo */}
                    { selectedFile && <img
                        src={ URL.createObjectURL( selectedFile ) }
                        className='
                            h-40
                            border-2
                            border-gray-600 dark:border-gray-50
                            rounded
                        '
                    /> }
                </Form.Field>

                {/* submit button */}
                <Form.Submit asChild>
                    <Button
                        className={`
                            mt-4
                            ${ loading ? "cursor-not-allowed opacity-70" : "" }
                        `}
                        disabled={ loading }
                    >
                        { loading ? "Creating account..." : "Create new account" }
                    </Button>
                </Form.Submit>
            </AuthForm>

            {/* Sign up with google button */}
            <GoogleButton 
                text="Sign up with Google"
            />

            {/* redirect to login link */}
            <Link
                to="/auth/login"
                className='
                    block
                    mt-6 mb-8
                    text-center
                    mx-auto
                    w-fit
                    underline
                '
            >
                Already have an account? Log in instead
            </Link>
        </>
    )
}
