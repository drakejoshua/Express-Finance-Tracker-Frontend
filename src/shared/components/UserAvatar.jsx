/* 
    UserAvatar.jsx

    This component represents a user avatar that can be used to display a 
    user's profile picture or initials. It uses the Avatar component from 
    the Radix UI library to create a circular avatar with an image and a 
    fallback option. The component accepts props for the image source, alt 
    text, fallback content, and additional styling through the className prop. 
    The avatar is designed to be flexible and can be used in various parts of 
    the application where a user avatar is needed.
*/


// import the Avatar component from the Radix UI library
import { Avatar } from 'radix-ui'


export default function UserAvatar({ src, alt, fallback, className, ...props }) {
    return (
        // Avatar.Root is the main container for the avatar, 
        // which includes the image and fallback content.
        <Avatar.Root 
            className={`
                rounded-full
                cursor-pointer
                overflow-hidden
                flex
                items-center
                justify-center
                select-none
                border-2
                border-green-600 dark:border-green-300
                ${className || ''}
            `}
            {...props}
        >
            {/* Avatar.Image is the container for the user's profile image. */}
            <Avatar.Image 
                src={ src } 
                alt={ alt }
                className='
                    w-full
                    h-full
                    object-cover
                '
            />

            {/* Avatar.Fallback is the container for the fallback content */}
            {/* which is displayed when the user's profile image is not available. */}
            <Avatar.Fallback
                className='
                    w-full
                    h-full
                    bg-green-700
                    text-white
                    flex
                    items-center
                    justify-center
                    font-medium
                '
            >
                { fallback }
            </Avatar.Fallback>
        </Avatar.Root>
    )
}
