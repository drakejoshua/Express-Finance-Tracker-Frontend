// import necessary dependencies
import { Dialog } from "radix-ui"
import { createContext, useContext, useState } from "react";
import { FaXmark } from 'react-icons/fa6'

// create context for sharing dialog state and functions
// across the application
export const DialogContext = createContext();

// custom hook to access dialog context from DialogProvider
export function useDialogProvider() {
    return useContext(DialogContext);
}

// DialogProvider and internal logic to manage active dialogs and 
// provide functions to open and close stateless dialogs ( e.g. alerts, confirmations )
// across the application
export function DialogProvider({ children }) {
    // state to manage active dialogs
    const [ activeDialogs, setActiveDialogs ] = useState([])

    // dialog: id, title, description, content

    // openDialog() - add a new dialog to the state with a unique id 
    // and provided content, title, and description
    function openDialog({ title, description, content }) {
        setActiveDialogs( ( prevDialogs ) => [ ...prevDialogs, { id: Date.now(), title, description, content } ] )
    }

    // closeDialog() - remove a dialog from the state by its id, 
    // which is triggered when the dialog is closed
    function closeDialog( dialogId ) {
        setActiveDialogs( ( prevDialogs ) => prevDialogs.filter( dialog => dialog.id !== dialogId ) )
    }

    return (
        <DialogContext.Provider value={{ openDialog, closeDialog }}>
            {children}

            {
                // map over the activeDialogs state to render a Dialog.Root for each active dialog,
                // passing the dialog's title, description, and content as props to the DialogComponent
                activeDialogs.map( dialog => (
                    <Dialog.Root defaultOpen={true} onOpenChange={ () => closeDialog( dialog.id ) } key={ dialog.id }>
                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/75" />
                            <Dialog.Content 
                                className="
                                    w-[90vw] max-w-112.5 bg-white fixed left-1/2 top-1/2 max-h-[85vh] -translate-x-1/2 -translate-y-1/2
                                    rounded-lg p-6 
                                "
                            >
                                <Dialog.Title
                                    className="
                                        text-xl font-semibold mt-4 mb-1 text-center
                                    "
                                > 
                                    { dialog.title } 
                                </Dialog.Title>

                                <Dialog.Description
                                    className="
                                        text-gray-700 text-center mb-4
                                    "
                                > 
                                    { dialog.description } 
                                </Dialog.Description>

                                { dialog.content }

                                <Dialog.Close
                                    className="
                                        absolute top-4 right-4 text-gray-900 text-2xl
                                    "
                                > 
                                    <FaXmark/> 
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                ) )
            }
        </DialogContext.Provider>
    )

}

// DialogComponent - a reusable component to render a dialog with a title,
// description, and content, which can be used for stateful dialogs 
// that require more complex interactions and state management within the dialog itself
export function DialogComponent({ title, description, content, ...props }) {
    return (
        <Dialog.Root {...props}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/75" />
                <Dialog.Content 
                    className="
                        w-[90vw] max-w-112.5 bg-white fixed left-1/2 top-1/2 max-h-[85vh] -translate-x-1/2 -translate-y-1/2
                        rounded-lg p-6 
                    "
                >
                    <Dialog.Title
                        className="
                            text-xl font-semibold mt-4 mb-1 text-center
                        "
                    > 
                        { title } 
                    </Dialog.Title>

                    <Dialog.Description
                        className="
                            text-gray-700 text-center mb-4
                        "
                    > 
                        { description } 
                    </Dialog.Description>

                    { content }

                    <Dialog.Close
                        className="
                            absolute top-4 right-4 text-gray-900 text-2xl
                        "
                    > 
                        <FaXmark/> 
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}