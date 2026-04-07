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

export default function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    return (
        <div
            className='
                h-full
                p-6 lg:p-8
                pt-20 lg:pt-14
                w-full
                max-w-100 md:max-w-120 xl:max-w-max
                mx-auto
                relative
                *:text-gray-800 dark:*:text-white
            '
        >
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

            {/* theme toggle button */}
            <ThemeButton
                className="
                    absolute
                    top-8
                    right-6
                "
            />
        </div>
    )
}
