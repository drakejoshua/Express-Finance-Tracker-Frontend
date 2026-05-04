export default function RouteHeading({ className, children }) {
    return (
        <h1
            className={`
                text-3xl
                font-medium
                text-gray-900 dark:text-white
                capitalize
                ${ className }
            `}
        >
            {children}
        </h1>
    )
}
