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
    const isMobileOrTablet = window.innerWidth < 1024;
    const { currentlyLoggedInUser, updateProfileInfo } = useAuthProvider()
    const { showToast } = useToastProvider()

    const [ name, setName ] = useState(currentlyLoggedInUser.data.name)
    const [ email, setEmail ] = useState(currentlyLoggedInUser.data.email)
    const [ password, setPassword ] = useState("")
    const [ 
        preferredCurrency, 
        setPreferredCurrency 
    ] = useState(currentlyLoggedInUser.data.preferred_currency)
    

    const [ isUpdating, setIsUpdating ] = useState(false)
    


    async function handleProfileFormUpdate(e) {
        // prevent default form submission behavior
        e.preventDefault()

        // set updating state to true to disable the form and 
        // show a loading indicator if needed
        setIsUpdating(true)

        const { status, error } = await updateProfileInfo({
            name,
            email,
            password,
            preferred_currency: preferredCurrency
        })

        if ( status === "success" ) {
            showToast({
                type: "success",
                message: "Profile updated successfully!"
            })
        } else {
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

    async function handleDeleteAvatar() {
        setIsUpdating(true)

        const { status, error } = await updateProfileInfo({}, true)

        if ( status === "success" ) {
            showToast({
                type: "success",
                message: "Profile photo deleted successfully!"
            })
        } else {
            showToast({
                type: "error",
                message: error.message || "An error occurred while deleting your profile photo. Please try again."
            })
        }

        setIsUpdating(false)
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
                        <DropdownMenu.Item>
                            <FaPen/>
                            <span> Update Avatar </span>
                        </DropdownMenu.Item>

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

            
        </div>
    )
}
