import { FaCaretDown, FaCaretUp } from 'react-icons/fa6'

export default function PortfolioItem({ 
    image, 
    name,
    percentChange, 
    balanceChange, 
    price
}) {
    return (
        <div
            className='
                flex
                gap-3
                items-center
                px-3 py-2
                rounded-lg
                hover:bg-gray-200 hover:dark:bg-gray-800
            '
        >
            <img 
                src={ image } 
                alt="bitcoin image" 
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
                '
            >
                <span
                    className='
                        font-medium
                        dark:text-white
                    '
                >
                    { name }
                </span>

                <span
                    className='
                        flex
                        gap-1
                        items-center
                        dark:text-white
                    '
                >
                    <span>
                        { price }
                    </span>
                    
                    <span
                        className={`
                            flex
                            items-center
                            text-sm
                            font-medium
                            ${
                                percentChange < 0 ? 
                                    'text-red-500 dark:text-red-300' : 
                                    'text-green-700 dark:text-green-300'
                            }
                        `}
                    >
                        { percentChange < 0 ? <FaCaretDown /> : <FaCaretUp /> }

                        <span>
                            { percentChange >= 0 ? `+${percentChange}` : percentChange }%
                        </span>
                    </span>
                </span>
            </div>

            <span
                className={`
                    ml-auto
                    font-medium
                    ${
                        percentChange < 0 ? 
                            'text-red-500 dark:text-red-300' : 
                            'text-green-700 dark:text-green-300'
                    }
                `}
            >
                { percentChange < 0 ? '-' : '+' }${ balanceChange }
            </span>
        </div>
    )
}
