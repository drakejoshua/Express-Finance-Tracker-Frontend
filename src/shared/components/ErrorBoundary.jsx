/* 
    ErrorBoundary.jsx

    This represents the ErrorBoundary component which is used to catch 
    JavaScript errors anywhere in the application and display a fallback 
    UI instead of the component tree that crashed.
*/


// import necessary dependencies and components
import React from 'react'
import Logo from './Logo'
import ThemeButton from './ThemeButton'


class ErrorBoundary extends React.Component {
    // initialize state to track if an error has 
    // occurred and to store the error object
    constructor(props) {
        super(props)
        this.state = { 
            hasError: false,
            error: null
        }
    }

    // getDerivedStateFromError()
    // This lifecycle method is called when an error is thrown in a child component. 
    // It updates the state to indicate that an error has occurred, which triggers 
    // the rendering of the fallback UI in the render method.
    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    // componentDidCatch()
    // This lifecycle method is called after an error has been thrown in a child component. 
    // It receives the error object and additional information about the error, which can 
    // be used for logging or debugging purposes. In this implementation, it logs the error 
    // to the console and updates the state with the error object to display its message in the UI.
    componentDidCatch(error, errorInfo) {
        this.setState({ error })
        console.error("GreenFinance ErrorBoundary caught an error", error, errorInfo)
    }

    render() {
        // check if an error has been caught in the state, and if so, render 
        // the fallback UI with the error message. Otherwise, render the child 
        // components normally.
        if ( this.state.hasError ) {
            return (
                // fallback UI container
                <div 
                    className="
                        h-screen 
                        overflow-auto 
                        dark:bg-gray-800 
                        bg-white
                    "
                >
                    {/* fallback UI */}
                    <div
                        className="
                            w-9/10
                            mx-auto
                            max-w-130
                            py-16
                            px-2
                        "
                    >
                        <div 
                            className="
                                flex
                                items-center
                                gap-3
                                justify-center
                            "
                        >
                            {/* Logo */}
                            <Logo 
                                className="
                                    h-6 lg:h-8
                                    w-auto
                                "
                            />
    
                            {/* theme toggle button */}
                            <ThemeButton 
                                className="
                                    text-xl
                                "
                            />
                        </div>
    
                        {/* heading */}
                        <h1 
                            className="
                                text-[6rem] lg:text-[10rem]
                                text-center
                                font-medium
                                text-gray-800 dark:text-white
                                opacity-80 dark:opacity-100
                            "
                        >
                            Oops!
                        </h1>
    
                        {/* error description */}
                        <p 
                            className="
                                text-center
                                dark:text-white
                                lg:text-lg
                                mt-4
                            "
                        >
                            An error occurred while loading the app.
                            You can view the error details below, Try refreshing the page 
                            or return to the homepage to try that action again.
                        </p>
    
                        {/* error message */}
                        <div 
                            className="
                                font-mono
                                p-4
                                dark:bg-black bg-gray-700
                                text-white
                                rounded-lg
                                mt-8
                            "
                        >
                            { this.state.error?.message || "No error details available." }
                        </div>
                    </div>
                </div>
            )
        }
    
        // if no error has been caught, render the child components normally
        return this.props.children
    }
}

export default ErrorBoundary