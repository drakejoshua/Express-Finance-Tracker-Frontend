// AuthForm.jsx
// This component is a wrapper around the Radix UI Form component, 
// providing a consistent layout and styling for authentication forms 
// such as login and signup.
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
