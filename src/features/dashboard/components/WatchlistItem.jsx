import { FaCaretDown, FaCaretUp } from 'react-icons/fa6'

export default function WatchlistItem({ 
    image, 
    name, 
    price, 
    percentChange 
}) {
    return (
        <div
            className='
                flex
                gap-3
                items-center
                px-4 py-2
                rounded-lg
                hover:bg-gray-200 dark:hover:bg-gray-700
            '
        >
            <img 
                src={ image } 
                alt={ name }
                className='
                    w-10
                    h-10
                    object-cover
                '
            />

            <div
                className='
                    flex
                    flex-col
                    dark:text-white
                '
            >
                <span
                    className='
                        font-medium
                    '
                >
                    { name }
                </span>

                <span
                    className='
                        flex
                        gap-1
                        items-center
                    '
                >
                    <span>
                        { price }
                    </span>
                </span>
            </div>

            <span
                className={`
                    flex
                    items-center
                    font-medium
                    ml-auto
                    ${
                        percentChange < 0 ? 
                            'text-red-500 dark:text-red-300' : 
                            'text-green-700 dark:text-green-300'
                    }
                `}
            >
                {percentChange < 0 ? <FaCaretDown /> : <FaCaretUp />}

                <span>
                    { percentChange >= 0 ? `+${percentChange}` : percentChange }%
                </span>
            </span>
        </div>
    )
}
