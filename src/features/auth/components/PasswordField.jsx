import { Form } from 'radix-ui'
import PasswordInput from './PasswordInput'

export default function PasswordField({ 
    label,
    name,
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
                <PasswordInput
                    className={`
                        border-2    
                        border-gray-600 dark:border-gray-50
                        dark:bg-gray-200
                        dark:[&>input::placeholder]:text-gray-500
                        dark:[&>input]:text-gray-800
                        ${ className }
                    `}
                    {...props}
                />
            </Form.Control>

            { emptyValidationMessage && <Form.Message match="valueMissing">
                { emptyValidationMessage}
            </Form.Message> }
            
            { invalidValidationMessage && <Form.Message match="tooShort">
                { invalidValidationMessage }
            </Form.Message> }
        </Form.Field>
    )
}
