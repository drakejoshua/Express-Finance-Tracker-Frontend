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