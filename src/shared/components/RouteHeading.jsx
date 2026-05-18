/* 
    RouteHeading.jsx

    This component represents a heading element that can be used in different
    routes or pages in the application. It accepts a className prop for styling
    and children prop to display the heading text. The component applies 
    default styles for font size, weight, and color, and allows for additional 
    styling through the className prop.
*/


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
