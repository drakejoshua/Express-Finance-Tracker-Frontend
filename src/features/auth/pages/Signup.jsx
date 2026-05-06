import { Form } from 'radix-ui'
import EmailField from '../../../shared/components/EmailField.jsx'
import { useState } from 'react'
import PasswordField from '../../../shared/components/PasswordField.jsx'
import Button from '../../../shared/components/Button'
import AltButton from '../../../shared/components/AltButton'
import { FaGoogle } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import AuthHeading from '../components/AuthHeading.jsx'
import TextField from '../../../shared/components/TextField.jsx'
import AuthForm from '../components/AuthForm.jsx'
import { useAuthProvider } from '../../../shared/providers/AuthProvider.jsx'
import { useDialogProvider } from '../../../shared/providers/DialogProvider.jsx'
import { useToastProvider } from '../../../shared/providers/ToastProvider.jsx'

export default function Signup() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ selectedFile, setSelectedFile ] = useState( null )

    const { signUp } = useAuthProvider()
    const { openDialog, closeDialog } = useDialogProvider()
    const { showToast } = useToastProvider()

    const [ loading, setLoading ] = useState( false )

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
                handleOpenDialog( error.message )
            } else {
                // if request is successful, alert user with a toast stating
                // account creation success and they will be redirected soon
                showToast({
                    type: "success",
                    message: `Signup successful, Your account has been created. 
                    You will be redirected shortly`
                })
            }
        } catch( error ) {
            // if any errors were encounted during the entire process
            // of signup, alert user with a dialog stating the error encountered
            handleOpenDialog( error.message )
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

    function handleOpenDialog( description ) {
        const dialogId = openDialog( { 
            title: "Signup Error",
            description: description,
            content: (
                <Button 
                    onClick={ () => closeDialog( dialogId ) }
                    className="
                        w-full
                    "
                >
                    Close
                </Button>
            )
        } )
    }

    return (
        <>
            <AuthHeading
                className="
                    mt-12 lg:mt-14
                "
            >
                Create an account
            </AuthHeading>

            <p
                className='
                    mt-4
                '
            >
                Sign up for a new account with GreenFinance. We help
                you manage your finances with precision and tracking
            </p>

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

                <EmailField
                    name={"email"}
                    label={"Email"}
                    value={ email }
                    placeholder={"Enter your email"}
                    onChange={ (e) => setEmail( e.target.value ) }
                    emptyValidationMessage={"Please enter an email address."}
                    invalidValidationMessage={"Please enter a valid email address."}
                />

                <PasswordField
                    name={"password"}
                    label={"Password"}
                    value={ password }
                    placeholder={"Enter your password"}
                    onChange={ (e) => setPassword( e.target.value ) }
                    emptyValidationMessage={"Please enter a password. Minimum 6 characters."}
                    invalidValidationMessage={"Your password should be at least 6 characters long."}
                />

                <Form.Field
                    className='
                        flex
                        flex-col
                        gap-2
                    '
                >
                    <Form.Label
                        className='
                            font-medium
                        '
                    >
                        Profile Photo ( optional ):
                    </Form.Label>

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

            {/* Sign up for google */}
            <AltButton
                className="
                    mt-4
                "
            >
                <FaGoogle/>
                Sign up with google
            </AltButton>

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
