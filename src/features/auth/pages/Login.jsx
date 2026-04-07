import { 
    Form,
    unstable_PasswordToggleField as PasswordToggleField
} from 'radix-ui'
import LogoWhite from '../../../assets/Brand/GreenFinanceLogoWhite.svg'
import LogoBlack from '../../../assets/Brand/GreenFinanceLogoBlack.svg'
import { FaEye, FaEyeSlash, FaGoogle, FaMoon, FaRegSun } from 'react-icons/fa6'
import { useState } from 'react'
import PasswordInput from '../components/PasswordInput'
import { useTheme } from '../../../shared/providers/ThemeProvider'

export default function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const { theme, toggleTheme } = useTheme()

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
            <img 
                src={ ( theme == "dark" ) ? LogoBlack : LogoWhite } 
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
                <Form.Field 
                    name='email'
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
                        Email
                    </Form.Label>

                    <Form.Control asChild>
                        <input 
                            type='email' 
                            placeholder='Enter your email'
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
                            value={ email }
                            onChange={ (e) => setEmail( e.target.value ) }
                            required
                        />
                    </Form.Control>

                    <Form.Message match='valueMissing'>
                        Please enter your email address.
                    </Form.Message>

                    <Form.Message match='typeMismatch'>
                        Please enter a valid email address.
                    </Form.Message>
                </Form.Field>

                <Form.Field 
                    name='password'
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
                        Password
                    </Form.Label>

                    <Form.Control asChild>
                        <PasswordInput
                            value={ password }
                            onChange={ (e) => setPassword( e.target.value ) }
                            className="
                                border-2    
                                border-gray-600 dark:border-gray-50
                                dark:bg-gray-200
                                dark:[&>input::placeholder]:text-gray-500
                                dark:[&>input]:text-gray-800
                            "
                        />
                    </Form.Control>

                    <Form.Message match="valueMissing">
                        Please enter your password
                    </Form.Message>
                    
                    <Form.Message match="tooShort">
                        Your password should be longer than 6 characters
                    </Form.Message>
                </Form.Field>

                <Form.Submit asChild>
                    <button
                        className='
                            w-full
                            p-2
                            font-medium
                            bg-green-600
                            text-white 
                            rounded
                            hover:bg-green-700 dark:hover:bg-gray-600
                            mt-4
                        '
                    >
                        Sign In
                    </button>
                </Form.Submit>
            </Form.Root>

            {/* sign in with google button */}
            <button
                className='
                    w-full
                    p-2
                    border
                    rounded
                    mt-4
                    flex
                    gap-2
                    font-medium
                    items-center
                    justify-center
                    bg-gray-800  dark:bg-gray-100
                    hover:bg-gray-700  dark:hover:bg-gray-200
                    [&]:text-white [&]:dark:text-gray-800
                '
            >
                <FaGoogle/>
                Sign in with Google
            </button>

            {/* theme toggle button */}
            <button
                className='
                    absolute
                    top-8
                    right-6
                    text-gray-600
                    text-2xl
                '
                onClick={ () => toggleTheme() }
            >
                { theme == 'dark' && <FaRegSun/> }
                { theme == 'light' && <FaMoon/>}
            </button>
        </div>
    )
}
