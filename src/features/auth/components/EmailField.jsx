// EmailField.jsx
// This component is a reusable email input field for authentication forms,
// such as login and signup. It provides built-in validation messages for
// empty and invalid email inputs, ensuring a consistent user experience
// across the authentication flow.
import { Form } from 'radix-ui'

export default function EmailField({ 
    name, 
    label, 
    className,
    emptyValidationMessage, 
    invalidValidationMessage, 
    ...props 
}) {
    return (
        <Form.Field 
            name={ name }
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
                { label }
            </Form.Label>

            <Form.Control asChild>
                <input 
                    type='email' 
                    className={`
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
                        ${ className }
                    `}
                    {...props}
                />
            </Form.Control>

            { emptyValidationMessage && <Form.Message match='valueMissing'>
                { emptyValidationMessage }
            </Form.Message> }

            { invalidValidationMessage && <Form.Message match='typeMismatch'>
                { invalidValidationMessage }
            </Form.Message> }
        </Form.Field>
    )
}
