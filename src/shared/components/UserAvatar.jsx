import { Avatar } from 'radix-ui'

export default function UserAvatar({ src, alt, fallback, className, ...props }) {
    return (
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
            <Avatar.Image 
                src={ src } 
                alt={ alt }
                className='
                    w-full
                    h-full
                    object-cover
                '
            />
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
