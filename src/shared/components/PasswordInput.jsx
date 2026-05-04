// PasswordInput.jsx
// This component is a reusable password input field for authentication forms,
// such as login and signup. It provides built-in validation messages for
// empty and invalid password inputs, ensuring a consistent user experience
// across the authentication flow.
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'

const PasswordInput = React.forwardRef( function( { className, ...props }, ref ) {
    const [ isPasswordVisible, setIsPasswordVisible ] = useState( false )

    return ( 
        <div
            className={`
                flex
                gap-2
                p-2
                px-3
                border
                rounded
                ${ className }
            `}
        >
            <input
                type={ isPasswordVisible ? "text" : "password" }
                className='
                    grow
                    focus:outline-none
                '
                required
                minLength={6}
                { ...props }
                ref={ ref }
            />

            <button
                className='
                    text-xl
                    text-gray-700
                '
                type='button'
                onClick={ () => setIsPasswordVisible( ( prev ) => !prev ) }
            >
                { isPasswordVisible == false && <FaEye /> }
                { isPasswordVisible == true && <FaEyeSlash />}
            </button>
        </div> 
    )
})

export default PasswordInput
