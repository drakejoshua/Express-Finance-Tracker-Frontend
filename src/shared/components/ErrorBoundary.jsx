import React from 'react'
import Logo from './Logo'
import ThemeButton from './ThemeButton'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            hasError: false,
            error: null
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error })
        console.error("GreenFinance ErrorBoundary caught an error", error, errorInfo)
    }

    render() {
        if ( this.state.hasError ) {
            return (
                <div 
                    className="
                        h-screen 
                        overflow-auto 
                        dark:bg-gray-800 
                        bg-white
                    "
                >
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
                            <Logo 
                                className="
                                    h-6 lg:h-8
                                    w-auto
                                "
                            />
    
                            <ThemeButton 
                                className="
                                    text-xl
                                "
                            />
                        </div>
    
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
    
        return this.props.children
    }
}

export default ErrorBoundary