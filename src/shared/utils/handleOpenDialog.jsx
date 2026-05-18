/* 
    handleOpenDialog()

    This function is a helper function for opening a dialog in the app. 
    It takes in a title, description, and the openDialog and closeDialog 
    functions from the DialogContext. It uses the openDialog function to create 
    a new dialog with the provided title and description, and includes a button 
    in the dialog content that calls the closeDialog function with the dialog's 
    ID when clicked to close the dialog. 
    
    This allows for easily opening alert dialogs with consistent structure 
    and behavior throughout the app without needing to duplicate the dialog 
    content and close logic in multiple places.
*/

// import Button component for rendering the close button 
// in the dialog content
import Button from '../components/Button'


export default function handleOpenDialog( title, description, openDialog, closeDialog ) {
    const dialogId = openDialog( { 
        title: title,
        description: description,
        content: (
            <Button 
                onClick={ () => closeDialog( dialogId ) }
                className="
                    w-full
                "
            >
                Close
            </Button>
        )
    } )
}