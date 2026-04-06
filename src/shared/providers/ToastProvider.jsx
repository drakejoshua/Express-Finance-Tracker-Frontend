import { Toast } from "radix-ui";
import { createContext, useContext, useState } from "react";
import { FaCircleCheck, FaCircleExclamation, FaTriangleExclamation, FaXmark } from "react-icons/fa6";

// create context for sharing toast state and functions
// across the application
export const ToastContext = createContext();

// custom hook to access toast context from ToastProvider
export function useToastProvider() {
    return useContext(ToastContext);
}

// ToastProvider and internal logic to manage active toasts and
// provide functions to show and hide stateless toasts ( e.g. success, error, info )
// across the application
export function ToastProvider({ children }) {
    // state to manage active toasts
    // const [ activeToasts, setActiveToasts ] = useState([{ id: 1, type: "success", message: "This is a test toast" }])
    const [ activeToasts, setActiveToasts ] = useState([])

    // toast: id, type, message

    // showToast() - add a new toast to the state with a unique id
    // and provided type and message
    function showToast({ type, message }) {
        setActiveToasts( ( prevToasts ) => [ ...prevToasts, { id: Date.now(), type, message } ] )
    }

    // hideToast() - remove a toast from the state by its id,
    // which is triggered when the toast is dismissed
    function hideToast( toastId ) {
        setActiveToasts( ( prevToasts ) => prevToasts.filter( toast => toast.id !== toastId ) )
    }

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            <Toast.Provider duration={5000}>
                {children}

                {
                    // map over the activeToasts state to render a Toast.Root for each active toast,
                    // passing the toast's type and message as props to the ToastComponent
                    activeToasts.map( function( toast ) {
                        return (
                            <Toast.Root
                                key={ toast.id }
                                className={`
                                    w-full 
                                    p-4 
                                    rounded-lg 
                                    shadow-md 
                                    group
                                    bg-white
                                    overflow-hidden
                                    border-gray-100
                                    border-2
                                    data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x)
                                `}
                                onOpenChange={ () => hideToast( toast.id ) }
                            >
                                {/* toast body */}
                                <div 
                                    className="
                                        flex 
                                        justify-between 
                                        items-center
                                    "
                                >
                                    {/* toast message */}
                                    <div 
                                        className="
                                            flex 
                                            gap-2
                                            items-center
                                        "
                                    >
                                        {/* toast icon */}
                                        {
                                            {
                                                success: <FaCircleCheck className="text-green-600 text-2xl"/>,
                                                error: <FaTriangleExclamation className="text-green-600 text-2xl"/>,
                                                info: <FaCircleExclamation className="text-green-600 text-2xl"/>
                                            }[ toast.type ]
                                        }

                                        {/* toast message */}
                                        <Toast.Title> { toast.message } </Toast.Title>
                                    </div>

                                    {/* toast close button */}
                                    <Toast.Close className="text-2xl">
                                        <FaXmark />
                                    </Toast.Close>
                                </div>

                                {/* toast timeout indicator */}
                                <div 
                                    className="
                                        absolute
                                        bottom-0
                                        left-0
                                        w-full
                                        h-1
                                        bg-green-700 dark:bg-green-600
                                        rounded-b-lg
                                        animate-[shrink_4.9s_linear_forwards]
                                        group-hover:[animation-play-state:paused]
                                    "
                                ></div>
                            </Toast.Root>
                        )
                    })
                }

                <Toast.Viewport className="fixed top-4 right-4 w-4/5 max-w-72.5"/>
            </Toast.Provider>
        </ToastContext.Provider>
    )
}