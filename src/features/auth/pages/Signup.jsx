import { Form } from 'radix-ui'
import EmailField from '../components/EmailField.jsx'
import { useState } from 'react'
import PasswordField from '../components/PasswordField'
import Button from '../../../shared/components/Button'
import AltButton from '../../../shared/components/AltButton'
import { FaGoogle } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import AuthHeading from '../components/AuthHeading.jsx'
import TextField from '../components/TextField.jsx'
import AuthForm from '../components/AuthForm.jsx'

export default function Signup() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ selectedFile, setSelectedFile ] = useState( null )

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
            >
                <div
                    className='
                        grid
                        gap-4
                        grid-cols-2
                    '
                >
                    {/* firstname input */}
                    {/* <Form.Field
                        className='
                            flex
                            flex-col
                            gap-1.5
                        '
                    >
                        <Form.Label
                            className='
                                font-medium
                            '
                        >
                            Firstname
                        </Form.Label>

                        <Form.Control asChild>
                            <input 
                                type='text'
                                className='
                                    w-full
                                    p-2
                                    px-3
                                    rounded
                                    border-2
                                    focus:outline-none
                                    border-gray-600 dark:border-gray-50
                                    dark:bg-gray-200
                                    dark:placeholder:text-gray-500
                                    dark:text-gray-900
                                '
                                
                            />
                        </Form.Control>

                        <Form.Message match="valueMissing">
                            Your firstname is required for signup
                        </Form.Message>
                        
                        <Form.Message match="tooShort">
                            Please enter a valid firstname
                        </Form.Message>
                    </Form.Field> */}
                    <TextField
                        label="Firstname"
                        minLength="3"
                        required
                        emptyValidationMessage='Your firstname is required for signup'
                        tooShortValidationMessage='Please enter a valid firstname'
                    />
                    
                    {/* lastname input */}
                    {/* <Form.Field
                        className='
                            flex
                            flex-col
                            gap-1.5
                        '
                    >
                        <Form.Label
                            className='
                                font-medium
                            '
                        >
                            Lastname
                        </Form.Label>

                        <Form.Control asChild>
                            <input 
                                type='text'
                                className='
                                    w-full
                                    p-2
                                    px-3
                                    rounded
                                    border-2
                                    focus:outline-none
                                    border-gray-600 dark:border-gray-50
                                    dark:bg-gray-200
                                    dark:placeholder:text-gray-500
                                    dark:text-gray-900
                                '
                            />
                        </Form.Control>
                    </Form.Field> */}
                    <TextField
                        label="Lastname"
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
                    invalidValidationMessage={"Your password should be longer than 6 characters."}
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
                        className="
                            mt-4
                        "
                    >
                        Create new account
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
