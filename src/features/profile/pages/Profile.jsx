/* 
    Profile.jsx

    This page allows users to view and update their profile information, 
    including their name, email, password, preferred currency, and 
    profile photo. The page features a user avatar that serves as a 
    trigger for a dropdown menu, providing options to update or delete 
    the profile photo. The profile update form includes fields for the 
    user's name, email, password, and preferred currency, with appropriate 
    validation and feedback messages. Users can also upload a new profile 
    photo through a dialog interface. The page is designed to be responsive 
    and user-friendly, ensuring a seamless experience for users managing 
    their profile settings.
*/


// import required dependencies and components
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import RouteHeading from '../../../shared/components/RouteHeading'
import { Avatar, DropdownMenu, Form, ToggleGroup } from 'radix-ui'
import UserAvatar from '../../../shared/components/UserAvatar'
import { FaCediSign, FaDollarSign, FaEuroSign, FaFrancSign, FaNairaSign, FaPen, FaRupeeSign, FaSterlingSign, FaTrash, FaYenSign } from 'react-icons/fa6'
import TextField from '../../../shared/components/TextField'
import EmailField from '../../../shared/components/EmailField'
import PasswordField from '../../../shared/components/PasswordField'
import Button from '../../../shared/components/Button'
import { useAuthProvider } from '../../../shared/providers/AuthProvider'
import { DialogComponent } from '../../../shared/providers/DialogProvider.jsx'
import { useToastProvider } from '../../../shared/providers/ToastProvider.jsx'



export default function Profile() {
    // derive a boolean value to determine if the user is 
    // on a mobile or tablet device
    const isMobileOrTablet = window.innerWidth < 1024;

    // get currently logged in user data and profile update function
    // from auth provider to display user info and handle profile updates
    const { currentlyLoggedInUser, updateProfileInfo } = useAuthProvider()

    // get showToast function from toast provider to display 
    // feedback messages to the user after profile update attempts 
    // or when certain actions are restricted based on authentication provider
    const { showToast } = useToastProvider()

    // form state variables to manage user input for profile updates and
    // profiles photo changes
    const [ name, setName ] = useState(currentlyLoggedInUser.data.name)
    const [ email, setEmail ] = useState(currentlyLoggedInUser.data.email)
    const [ password, setPassword ] = useState("")
    const [ 
        preferredCurrency, 
        setPreferredCurrency 
    ] = useState(currentlyLoggedInUser.data.preferred_currency)
    const [ newProfilePhoto, setNewProfilePhoto ] = useState(null)

    // state variables to manage loading states for profile updates and
    // profile photo updates, as well as the visibility of the profile 
    // photo update dialog
    const [ isUpdating, setIsUpdating ] = useState(false)
    const [ isUpdatingProfilePhoto, setIsUpdatingProfilePhoto ] = useState(false)
    const [ 
        isUpdateProfilePhotoDialogOpen, 
        setIsUpdateProfilePhotoDialogOpen 
    ] = useState(false)


    // handleProfileFormUpdate()
    // This function is responsible for handling the submission of the profile
    // update form. It prevents the default form submission behavior, sets the
    // updating state to true to disable the form, show a loading indicator
    // and then calls the updateProfileInfo function from the auth provider with the
    // updated profile information. Based on the response, it shows a success or error toast message,
    // and finally resets the updating state to re-enable the form. Optionally, it also resets
    // the password field after an update attempt for security reasons.
    async function handleProfileFormUpdate(e) {
        // prevent default form submission behavior
        e.preventDefault()

        // set updating state to true to disable the form and 
        // show a loading indicator if needed
        setIsUpdating(true)

        // call the updateProfileInfo function from the auth 
        // provider with the updated profile information
        const { status, error } = await updateProfileInfo({
            name,
            email,
            password,
            preferred_currency: preferredCurrency
        })

        // check the response status and show appropriate toast 
        // messages based on the outcome of the update attempt
        if ( status === "success" ) {
            // show success toast message if the profile update was 
            // successful
            showToast({
                type: "success",
                message: "Profile updated successfully!"
            })
        } else {
            // show error toast message if there was an error during the 
            // profile update
            showToast({
                type: "error",
                message: error.message || "An error occurred while updating your profile. Please try again."
            })
        }

        // reset updating state to re-enable the form after the 
        // update process is complete or an error has been handled
        setIsUpdating(false)

        // optionally, you can also reset the password field after 
        // an update attempt for security reasons
        setPassword("")
    }

    // handleDeleteAvatar()
    // This function handles the deletion of the user's profile photo. 
    // It sets the updating state to true to disable interactions during 
    // the process, then calls the updateProfileInfo function with an empty 
    // object and a second argument set to true to indicate that the profile 
    // photo should be deleted. Based on the response, it shows a success or 
    // error toast message, and finally resets the updating state.
    async function handleDeleteAvatar() {
        // set updating state to true to disable interactions 
        // during the profile photo deletion process
        setIsUpdating(true)

        // call the updateProfileInfo function with an empty 
        // object and a second argument set to true to indicate 
        // that the profile photo should be deleted
        const { status, error } = await updateProfileInfo({}, true)

        // check the response status and show appropriate toast 
        // messages based on the outcome of the profile photo 
        // deletion attempt
        if ( status === "success" ) {
            // show success toast message if the profile photo deletion was successful
            showToast({
                type: "success",
                message: "Profile photo deleted successfully!"
            })
        } else {
            // show error toast message if the profile photo deletion failed
            showToast({
                type: "error",
                message: error.message || "An error occurred while deleting your profile photo. Please try again."
            })
        }

        // reset updating state to re-enable interactions after the profile 
        // photo deletion process is complete or an error has been handled
        setIsUpdating(false)
    }

    // showProfilePhotoDialog()
    // This function is responsible for opening the profile photo
    // update dialog by setting the isUpdateProfilePhotoDialogOpen 
    // state to true.
    function showProfilePhotoDialog() {
        setIsUpdateProfilePhotoDialogOpen(true)
    }

    // closeProfilePhotoDialog()
    // This function is responsible for closing the profile photo update dialog.
    // It sets the isUpdateProfilePhotoDialogOpen state to false and also resets
    // the newProfilePhoto state to null to clear any selected file when the dialog is closed.
    function closeProfilePhotoDialog() {
        setIsUpdateProfilePhotoDialogOpen(false)
        setNewProfilePhoto(null)
    }


    // handleProfilePhotoUpdate()
    // This function handles the process of updating the user's profile photo.
    // It first checks if a new profile photo has been selected. If not, 
    // it shows an error toast message and closes the dialog.
    // If a new photo is selected, it sets the updating state to true to disable 
    // interactions during the upload process, then calls the updateProfileInfo 
    // function with the new photo. Based on the response, it shows a success or 
    // error toast message, and finally resets the updating state and closes the dialog.
    async function handleProfilePhotoUpdate() {
        // check if a new profile photo has been selected before 
        // attempting to upload and show an error message if none is selected
        if ( !newProfilePhoto ) {
            showToast({
                type: "error",
                message: "Please select a new profile photo to upload."
            })
            closeProfilePhotoDialog()
            return
        }

        // set updating state to true to disable interactions during the 
        // profile photo upload process
        setIsUpdatingProfilePhoto(true)

        // call the updateProfileInfo function with the new profile 
        // photo and handle the response to show appropriate toast messages 
        // based on the outcome of the upload attempt
        const { status, error } = await updateProfileInfo({ photo: newProfilePhoto })

        // check the response status and show appropriate toast messages 
        // based on the outcome of the profile photo update attempt
        if ( status === "success" ) {
            // show success toast message if the profile photo update was successful
            showToast({
                type: "success",
                message: "Profile photo updated successfully!"
            })

            // close the profile photo update dialog after a successful update
            closeProfilePhotoDialog()
        } else {
            // show error toast message if there was an error during the 
            // profile photo update
            showToast({
                type: "error",
                message: error.message || "An error occurred while updating your profile photo. Please try again."
            })
        }

        // reset updating state to re-enable interactions after the profile
        // photo update process is complete or an error has been handled
        setIsUpdatingProfilePhoto(false)
    }

    return (
        <div>
            {/* profile heading */}
            <RouteHeading>
                update your profile
            </RouteHeading>

            {/* avatar dropdown - update and delete image */}
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    {/* user avatar - profile photo preview */}
                    <UserAvatar
                        src={ currentlyLoggedInUser.data.profile_photo }
                        alt="user profile photo"
                        fallback={ 
                            currentlyLoggedInUser.data.name.split(" ")
                            .map( name => name[0] ).join("") 
                        }
                        className="
                            mt-12
                            w-48
                            h-48
                        "
                    />
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    {/* avatar options */}
                    <DropdownMenu.Content 
                        side={ isMobileOrTablet ? "bottom" : "right" }
                        sideOffset={16}
                        className='
                            bg-gray-200
                            p-3 py-4
                            rounded-lg
                            *:flex
                            *:gap-2
                            *:items-center
                            *:cursor-pointer
                            *:select-none
                            *:p-2 *:px-4
                            *:rounded-md
                            *:hover:bg-gray-600
                            *:hover:text-white
                        '
                    >
                        {/* update avatar option */}
                        <DropdownMenu.Item onSelect={ showProfilePhotoDialog }>
                            <FaPen/>
                            <span> Update Avatar </span>
                        </DropdownMenu.Item>

                        {/* delete avatar option */}
                        <DropdownMenu.Item onSelect={ handleDeleteAvatar }>
                            <FaTrash/>
                            <span> Delete Avatar </span>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>

            {/* profile update form */}
            <Form.Root
                className='
                    mt-8
                    flex
                    flex-col
                    gap-4
                    lg:w-2/4
                    md:w-3/4
                    w-full
                '
                onSubmit={ handleProfileFormUpdate }
            >
                {/* name input */}
                <TextField
                    label="Name"
                    minLength={3}
                    required
                    placeholder='Enter new name'
                    value={ name }
                    onChange={ (e) => setName(e.target.value) }
                    emptyValidationMessage='Your name is required for your account'
                    tooShortValidationMessage='Please enter a valid name'
                />

                {/* email input */}
                <EmailField 
                    name={"email"}
                    label={"Email"}
                    required
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                    placeholder={"Enter new email"}
                    readOnly={ currentlyLoggedInUser.data.provider !== "local" }
                    onClick={ 
                        () => {
                            if ( currentlyLoggedInUser.data.provider !== "local" ) {
                                showToast({
                                    type: "info",
                                    message: "Email updates are currently disabled for users authenticated via Google."
                                })
                            }
                        }
                    }
                    emptyValidationMessage={"Please enter an email address."}
                    invalidValidationMessage={"Please enter a valid email address."}
                />

                {/* password input */}
                <PasswordField
                    name={"password"}
                    label={"Password"}
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                    readOnly={ currentlyLoggedInUser.data.provider !== "local" }
                    onClick={ 
                        () => {
                            if ( currentlyLoggedInUser.data.provider !== "local" ) {
                                showToast({
                                    type: "info",
                                    message: "Password updates are currently disabled for users authenticated via Google."
                                })
                            }
                        }
                    }
                    placeholder={"Enter new password"}
                    emptyValidationMessage={"Please enter a password. Minimum 6 characters."}
                    invalidValidationMessage={"Your password should be at least 6 characters long."}
                />

                {/* preferred currency options */}
                <Form.Field>
                    <Form.Label
                        className='
                            font-medium
                            dark:text-white
                        '
                    >
                        Preferred Currency
                    </Form.Label>

                    <Form.Control asChild>
                        <ToggleGroup.Root 
                            type='single'
                            className='
                                mt-2
                                border-2
                                border-gray-600 dark:border-gray-200
                                rounded-sm
                                grid
                                lg:grid-cols-6
                                md:grid-cols-4
                                grid-cols-3
                                *:flex
                                *:flex-col
                                *:gap-1
                                *:items-center
                                *:p-2 *:py-3.5
                                dark:*:text-white
                                *:data-[state=on]:bg-gray-600 dark:*:data-[state=on]:bg-gray-200
                                *:data-[state=on]:text-white dark:*:data-[state=on]:text-gray-900
                            '
                            value={ preferredCurrency }
                            onValueChange={ (value) => { if (value) setPreferredCurrency(value) } }
                        >
                            <ToggleGroup.Item value='USD'>
                                <FaDollarSign />

                                <span>
                                    USD
                                </span>
                            </ToggleGroup.Item>
                            
                            <ToggleGroup.Item value='GBP'>
                                <FaSterlingSign />

                                <span>
                                    GBP
                                </span>
                            </ToggleGroup.Item>
                            
                            <ToggleGroup.Item value='EUR'>
                                <FaEuroSign />

                                <span>
                                    EUR
                                </span>
                            </ToggleGroup.Item>
                            
                            <ToggleGroup.Item value='JPY'>
                                <FaYenSign />

                                <span>
                                    JPY
                                </span>
                            </ToggleGroup.Item>
                            
                            <ToggleGroup.Item value='GHS'>
                                <FaCediSign />

                                <span>
                                    GHS
                                </span>
                            </ToggleGroup.Item>
                            
                            <ToggleGroup.Item value='CHF'>
                                <FaFrancSign />

                                <span>
                                    CHF
                                </span>
                            </ToggleGroup.Item>
                            
                            <ToggleGroup.Item value='NGN'>
                                <FaNairaSign />

                                <span>
                                    NGN
                                </span>
                            </ToggleGroup.Item>
                            
                            <ToggleGroup.Item value='INR'>
                                <FaRupeeSign />

                                <span>
                                    INR
                                </span>
                            </ToggleGroup.Item>
                        </ToggleGroup.Root>
                    </Form.Control>
                </Form.Field>

                {/* submit button */}
                <Button
                    className={`
                        mt-6
                        w-fit
                        px-5
                        ${ isUpdating ? "cursor-not-allowed opacity-70" : "" }
                    `}
                    disabled={ isUpdating }
                >
                    { isUpdating ? "Updating profile..." : "Update Profile" }
                </Button>
            </Form.Root>

            {/* profile photo update dialog */}
            <DialogComponent
                title={"Update profile photo"}
                description={"Select a new profile photo to update your current one."}
                open={ isUpdateProfilePhotoDialogOpen }
                onOpenChange={ closeProfilePhotoDialog }
            >
                {/* file input for selecting new profile photo */}
                <input 
                    type="file" 
                    accept="image/*" 
                    className='
                        w-full
                        bg-gray-700
                        p-2 px-4
                        text-white
                        rounded-md
                    '
                    onChange={ ( e ) => setNewProfilePhoto( e.target.files[0] ) }
                />

                {/* new profile photo preview */}
                { newProfilePhoto && <img 
                    src={ URL.createObjectURL(newProfilePhoto) } 
                    alt="preview" 
                    className='
                        w-full 
                        h-auto 
                        mt-4 
                        rounded-md
                        border-2
                        border-gray-600
                    '
                />}

                {/* upload button */}
                <Button
                    className={`
                        w-full
                        mt-4
                    `}
                    onClick={ handleProfilePhotoUpdate }
                    disabled={ isUpdatingProfilePhoto }
                >
                    { 
                        isUpdatingProfilePhoto ? 
                        "Updating Profile Photo..." : 
                        "Upload New Photo" 
                    }
                </Button>
            </DialogComponent>

            {/* outlet for nested routes such as: the asset details page */}
            <Outlet />
        </div>
    )
}
