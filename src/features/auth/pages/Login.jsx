import { Form } from 'radix-ui'
import { FaGoogle } from 'react-icons/fa6'
import { useState } from 'react'
import EmailField from '../components/EmailField'
import PasswordField from '../components/PasswordField'
import Button from '../../../shared/components/Button'
import AltButton from '../../../shared/components/AltButton'
import { Link } from 'react-router-dom'
import AuthHeading from '../components/AuthHeading'
import AuthForm from '../components/AuthForm'

export default function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

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

            <AuthForm
                className="
                    mt-6
                "
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
            </AuthForm>

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
