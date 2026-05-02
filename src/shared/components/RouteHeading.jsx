export default function RouteHeading({ className, children }) {
    return (
        <h1
            className={`
                text-3xl
                font-medium
                dark:text-white
                ${ className }
            `}
        >
            {children}
        </h1>
    )
}
