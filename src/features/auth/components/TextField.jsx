import { Form } from 'radix-ui'

export default function TextField({
    label,
    className,
    emptyValidationMessage,
    tooShortValidationMessage,
    ...props
}) {
    return (
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
                { label }
            </Form.Label>

            <Form.Control asChild>
                <input 
                    type='text'
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
                    { ...props }
                />
            </Form.Control>

            { emptyValidationMessage && <Form.Message match="valueMissing">
                { emptyValidationMessage }
            </Form.Message>}
            
            { tooShortValidationMessage && <Form.Message match="tooShort">
                { tooShortValidationMessage }
            </Form.Message>}
        </Form.Field>
    )
}
