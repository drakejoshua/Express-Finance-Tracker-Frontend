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
