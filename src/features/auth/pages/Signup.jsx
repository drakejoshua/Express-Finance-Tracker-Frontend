import Logo from '../../../shared/components/Logo.jsx'
import { Form } from 'radix-ui'
import EmailField from '../components/EmailField.jsx'
import { useState } from 'react'
import PasswordField from '../components/PasswordField'
import Button from '../../../shared/components/Button'
import AltButton from '../../../shared/components/AltButton'
import { FaCirclePlus, FaGoogle } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export default function Signup() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ selectedFile, setSelectedFile ] = useState( null )

    return (
        <>
            <Logo
                className="
                    w-44 lg:w-40
                    h-auto
                "
            />

            <h1
                className='
                    text-3xl
                    font-medium
                    mt-12 lg:mt-14
                    capitalize
                '
            >
                Create an account
            </h1>

            <p
                className='
                    mt-4
                '
            >
                Sign up for a new account with GreenFinance. We help
                you manage your finances with precision and tracking
            </p>

            <Form.Root
                className='
                    mt-6
                    flex
                    flex-col
                    gap-2.5
                '
            >
                <div
                    className='
                        grid
                        gap-4
                        grid-cols-2
                    '
                >
                    {/* firstname input */}
                    <Form.Field
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
                                minLength="3"
                                required
                            />
                        </Form.Control>

                        <Form.Message match="valueMissing">
                            Your firstname is required for signup
                        </Form.Message>
                        
                        <Form.Message match="tooShort">
                            Please enter a valid firstname
                        </Form.Message>
                    </Form.Field>
                    
                    {/* lastname input */}
                    <Form.Field
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
                    </Form.Field>
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
            </Form.Root>

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
