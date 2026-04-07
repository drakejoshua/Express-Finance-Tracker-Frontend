import { Form } from 'radix-ui'
import { FaGoogle } from 'react-icons/fa6'
import { useState } from 'react'
import PasswordInput from '../components/PasswordInput'
import EmailField from '../components/EmailField'
import PasswordField from '../components/PasswordField'
import Button from '../../../shared/components/Button'
import AltButton from '../../../shared/components/AltButton'
import ThemeButton from '../../../shared/components/ThemeButton'
import Logo from '../../../shared/components/Logo'
import { Link } from 'react-router-dom'

export default function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    return (
        <>
            <Logo 
                className='
                    w-44 lg:w-40
                    h-auto
                '
            />
            
            <h1
                className='
                    text-3xl
                    font-medium
                    mt-12 lg:mt-14
                    capitalize
                '
            >
                Sign in to your account
            </h1>

            <p
                className='
                    mt-4
                '
            >
                Please sign in to your account 
                to access your dashboard and manage your finances effectively.
            </p>

            <Form.Root
                className='
                    mt-6
                    flex
                    flex-col
                    gap-2.5
                '
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
                        className="
                            mt-4
                        "
                    >
                        Sign In
                    </Button>
                </Form.Submit>
            </Form.Root>

            {/* sign in with google button */}
            <AltButton
                className="
                    mt-4
                "
            >
                <FaGoogle/>
                Sign in with Google
            </AltButton>

            {/* redirect to login link */}
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
