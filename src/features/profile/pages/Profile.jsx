import React from 'react'
import { Outlet } from 'react-router-dom'
import RouteHeading from '../../../shared/components/RouteHeading'
import { Avatar, DropdownMenu, Form, ToggleGroup } from 'radix-ui'
import UserAvatar from '../../../shared/components/UserAvatar'
import bitcoinImage from '../../../assets/Design/bitcoin.png'
import { FaCediSign, FaDollarSign, FaEuroSign, FaFrancSign, FaNairaSign, FaPen, FaRupeeSign, FaSterlingSign, FaTrash, FaYenSign } from 'react-icons/fa6'
import TextField from '../../../shared/components/TextField'
import EmailField from '../../../shared/components/EmailField'
import PasswordField from '../../../shared/components/PasswordField'
import Button from '../../../shared/components/Button'

export default function Profile() {
    const isMobileOrTablet = window.innerWidth < 1024;

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
                        src={ bitcoinImage }
                        alt="user avatar"
                        fallback="JD"
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

                        <DropdownMenu.Item>
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
            >
                {/* name input */}
                <TextField
                    label="Name"
                    minLength={3}
                    required
                    placeholder='Enter your name'
                    emptyValidationMessage='Your name is required for your account'
                    tooShortValidationMessage='Please enter a valid name'
                />

                {/* email input */}
                <EmailField 
                    name={"email"}
                    label={"Email"}
                    required
                    placeholder={"Enter your email"}
                    emptyValidationMessage={"Please enter an email address."}
                    invalidValidationMessage={"Please enter a valid email address."}
                />

                {/* password input */}
                <PasswordField
                    name={"password"}
                    label={"Password"}
                    required
                    placeholder={"Enter your password"}
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
                            defaultValue='usd'
                        >
                            <ToggleGroup.Item value='usd'>
                                <FaDollarSign />

                                <span>
                                    USD
                                </span>
                            </ToggleGroup.Item>
                            
                            <ToggleGroup.Item value='gbp'>
                                <FaSterlingSign />

                                <span>
                                    GBP
                                </span>
                            </ToggleGroup.Item>
                            
                            <ToggleGroup.Item value='eur'>
                                <FaEuroSign />

                                <span>
                                    EUR
                                </span>
                            </ToggleGroup.Item>
                            
                            <ToggleGroup.Item value='jpy'>
                                <FaYenSign />

                                <span>
                                    JPY
                                </span>
                            </ToggleGroup.Item>
                            
                            <ToggleGroup.Item value='ghs'>
                                <FaCediSign />

                                <span>
                                    GHS
                                </span>
                            </ToggleGroup.Item>
                            
                            <ToggleGroup.Item value='chf'>
                                <FaFrancSign />

                                <span>
                                    CHF
                                </span>
                            </ToggleGroup.Item>
                            
                            <ToggleGroup.Item value='ngn'>
                                <FaNairaSign />

                                <span>
                                    NGN
                                </span>
                            </ToggleGroup.Item>
                            
                            <ToggleGroup.Item value='inr'>
                                <FaRupeeSign />

                                <span>
                                    INR
                                </span>
                            </ToggleGroup.Item>
                        </ToggleGroup.Root>
                    </Form.Control>
                </Form.Field>

                <Button
                    className="
                        mt-6
                        w-fit
                        px-5
                    "
                >
                    Update Profile
                </Button>
            </Form.Root>
        
            {/* outlet for the asset details route */}
            <Outlet />
        </div>
    )
}
