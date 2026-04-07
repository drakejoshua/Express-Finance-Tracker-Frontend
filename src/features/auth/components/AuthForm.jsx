import { Form } from 'radix-ui'

export default function AuthForm({ className, children, ...props }) {
    return (
        <Form.Root
            className={`
                mt-6
                flex
                flex-col
                gap-2.5
                ${ className }
            `}
            { ...props }
        >
            { children }
        </Form.Root>
    )
}
