import React from 'react'
import { Outlet } from 'react-router-dom'
import bitcoinImage from '../../../assets/Design/bitcoin.png'
import { FaArrowDown, FaCaretDown, FaCaretUp, FaPen, FaTrash, FaTriangleExclamation } from 'react-icons/fa6'
import RouteError from '../../../shared/components/RouteError'
import ItemSkeleton from '../components/ItemSkeleton'
import AlertSkeleton from '../components/AlertSkeleton'
import { useTheme } from '../../../shared/providers/ThemeProvider.jsx'

export default function Dashboard() {
    const { theme } = useTheme()

    return (
        <div className={`${ theme == "dark" ? "route-dark" : "" }`}>
            {/* dashboard error content */}
            { false && <RouteError
                title="Error loading dashboard"
                message="There was an error loading the dashboard. Please try again later."
                handleRetry={ () => window.location.reload() }
            />}

            {/* dashboard loading content */}
            { true && <div>
                {/* greeting */}
                <h1
                    className='
                        mt-5
                        text-3xl
                        font-medium
                        dark:text-white
                    '
                >
                    Welcome, Joshua
                </h1>

                {/* portfolio overview */}
                <div
                    className='
                        mt-10
                        bg-gray-100 dark:bg-gray-700 
                        rounded-lg
                        p-5 py-8 lg:p-8
                    '
                >
                    <h2
                        className='
                            lg:text-lg
                            font-medium
                            text-gray-700 dark:text-gray-100
                        '
                    >
                        Portfolio Overview
                    </h2>

                    {/* portfolio balance */}
                    <div
                        className='
                            mt-4
                            flex
                            items-center
                            gap-3
                        '
                    >
                        {/* balance skeleton */}
                        <span
                            className="
                                skeleton
                                h-10
                                w-48
                                rounded-md
                            "
                        ></span>
                    </div>

                    {/* portfolio chart skeleton */}
                    <div
                        className='
                            mt-10
                            h-84
                            w-full
                            rounded-lg
                            skeleton
                        '
                    ></div>

                    {/* portfolio stats */}
                    <div
                        className='
                            mt-10
                            grid
                            grid-cols-1 md:grid-cols-2
                            gap-8 lg:gap-20
                        '
                    >
                        <div>
                            <h3
                                className='
                                    text-lg
                                    font-medium
                                    capitalize
                                    dark:text-white
                                '
                            >
                                top gainers
                            </h3>

                            {/* top 3 gainers */}
                            <div
                                className='
                                    mt-3
                                    flex
                                    flex-col
                                '
                            >
                                <ItemSkeleton />

                                <ItemSkeleton />

                                <ItemSkeleton />
                            </div>
                        </div>
                        
                        {/* top 3 losers */}
                        <div>
                            <h3
                                className='
                                    text-lg
                                    font-medium
                                    capitalize
                                    dark:text-white
                                '
                            >
                                top losers
                            </h3>

                            <div
                                className='
                                    mt-3
                                    flex
                                    flex-col
                                '
                            >
                                <ItemSkeleton />
                                
                                <ItemSkeleton />

                                <ItemSkeleton />
                            </div>
                        </div>
                    </div>
                </div>

                {/* watchlist overview */}
                <h2
                    className='
                        text-3xl
                        mt-10
                        dark:text-white
                    '
                >
                    Recent Watchlist & Alerts
                </h2>
                
                {/* watchlist stats */}
                <div
                    className='
                        mt-10
                        grid
                        grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                        gap-8 lg:gap-10
                    '
                >
                    {/* top 3 gainers */}
                    <div>
                        <h3
                            className='
                                text-lg
                                font-medium
                                capitalize
                                dark:text-white
                            '
                        >
                            top gainers
                        </h3>

                        <div
                            className='
                                mt-3
                                flex
                                flex-col
                            '
                        >
                            <ItemSkeleton />
                                
                            <ItemSkeleton />

                            <ItemSkeleton />
                        </div>
                    </div>
                    
                    {/* top 3 losers */}
                    <div>
                        <h3
                            className='
                                text-lg
                                font-medium
                                capitalize
                                dark:text-white
                            '
                        >
                            top losers
                        </h3>

                        <div
                            className='
                                mt-3
                                flex
                                flex-col
                            '
                        >
                            {/* item */}
                            <ItemSkeleton />

                            <ItemSkeleton />

                            <ItemSkeleton />
                        </div>
                    </div>

                    {/* alerts */}
                    <div
                        className='
                            bg-gray-100 dark:bg-gray-700
                            p-4 lg:p-5
                            rounded-lg
                        '
                    >
                        <h3
                            className='
                                text-lg
                                font-medium
                                dark:text-white
                            '
                        >
                            Alerts
                        </h3>

                        <div
                            className='
                                mt-2
                            '
                        >
                            {/* alert */}
                            <AlertSkeleton />
                            
                            <AlertSkeleton />
                            
                            <AlertSkeleton />
                            
                            <AlertSkeleton />
                            
                            <AlertSkeleton />
                        </div>
                    </div>
                </div>
            </div>}

            {/* dashboard loaded content */}
            { false && <div>
                {/* greeting */}
                <h1
                    className='
                        mt-5
                        text-3xl
                        font-medium
                        dark:text-white
                    '
                >
                    Welcome, Joshua
                </h1>

                {/* portfolio overview */}
                <div
                    className='
                        mt-10
                        bg-gray-100 dark:bg-gray-700 
                        rounded-lg
                        p-5 py-8 lg:p-8
                    '
                >
                    <h2
                        className='
                            lg:text-lg
                            font-medium
                            text-gray-700 dark:text-gray-100
                        '
                    >
                        Portfolio Overview
                    </h2>

                    {/* portfolio balance */}
                    <div
                        className='
                            mt-2
                            flex
                            items-center
                            gap-3
                        '
                    >
                        <span
                            className='
                                text-4xl lg:text-5xl
                                font-medium
                                dark:text-white
                            '
                        >
                            $28,000
                        </span>

                        <span
                            className='
                                lg:text-lg
                                font-medium
                                flex
                                items-center
                                text-red-500 dark:text-red-300
                            '
                        >
                            <FaCaretDown />

                            <span>
                                -5.2%
                            </span>
                        </span>
                    </div>

                    {/* portfolio chart */}
                    <div
                        className='
                            mt-10
                            h-84
                            bg-green-200
                            rounded-lg
                        '
                    >
                    </div>

                    {/* portfolio stats */}
                    <div
                        className='
                            mt-10
                            grid
                            grid-cols-1 md:grid-cols-2
                            gap-8 lg:gap-20
                        '
                    >
                        <div>
                            <h3
                                className='
                                    text-lg
                                    font-medium
                                    capitalize
                                    dark:text-white
                                '
                            >
                                top gainers
                            </h3>

                            {/* top 3 gainers */}
                            <div
                                className='
                                    mt-3
                                    flex
                                    flex-col
                                '
                            >
                                {/* red item */}
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
                                        src={ bitcoinImage } 
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
                                            bitcoin
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
                                                $28,000
                                            </span>
                                            
                                            <span
                                                className='
                                                    flex
                                                    items-center
                                                    text-sm
                                                    text-red-500 dark:text-red-300
                                                    font-medium
                                                '
                                            >
                                                <FaCaretDown />

                                                <span>
                                                    -5.2%
                                                </span>
                                            </span>
                                        </span>
                                    </div>

                                    <span
                                        className='
                                            ml-auto
                                            text-red-500 dark:text-red-300
                                            font-medium
                                        '
                                    >
                                        -$1,500
                                    </span>
                                </div>

                                {/* green item */}
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
                                        src={ bitcoinImage } 
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
                                            bitcoin
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
                                                $28,000
                                            </span>
                                            
                                            <span
                                                className='
                                                    flex
                                                    items-center
                                                    text-sm
                                                    text-green-700 dark:text-green-300
                                                    font-medium
                                                '
                                            >
                                                <FaCaretUp />

                                                <span>
                                                    -5.2%
                                                </span>
                                            </span>
                                        </span>
                                    </div>

                                    <span
                                        className='
                                            ml-auto
                                            text-green-700 dark:text-green-300
                                            font-medium
                                        '
                                    >
                                        +$1,500
                                    </span>
                                </div>

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
                                        src={ bitcoinImage } 
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
                                            bitcoin
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
                                                $28,000
                                            </span>
                                            
                                            <span
                                                className='
                                                    flex
                                                    items-center
                                                    text-sm
                                                    text-red-500 dark:text-red-300
                                                    font-medium
                                                '
                                            >
                                                <FaCaretDown />

                                                <span>
                                                    -5.2%
                                                </span>
                                            </span>
                                        </span>
                                    </div>

                                    <span
                                        className='
                                            ml-auto
                                            text-red-500 dark:text-red-300
                                            font-medium
                                        '
                                    >
                                        -$1,500
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {/* top 3 losers */}
                        <div>
                            <h3
                                className='
                                    text-lg
                                    font-medium
                                    capitalize
                                    dark:text-white
                                '
                            >
                                top losers
                            </h3>

                            <div
                                className='
                                    mt-3
                                    flex
                                    flex-col
                                '
                            >
                                {/* green item */}
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
                                        src={ bitcoinImage } 
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
                                            bitcoin
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
                                                $28,000
                                            </span>
                                            
                                            <span
                                                className='
                                                    flex
                                                    items-center
                                                    text-sm
                                                    text-green-700 dark:text-green-300
                                                    font-medium
                                                '
                                            >
                                                <FaCaretUp />

                                                <span>
                                                    -5.2%
                                                </span>
                                            </span>
                                        </span>
                                    </div>

                                    <span
                                        className='
                                            ml-auto
                                            text-green-700 dark:text-green-300
                                            font-medium
                                        '
                                    >
                                        +$1,500
                                    </span>
                                </div>

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
                                        src={ bitcoinImage } 
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
                                            bitcoin
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
                                                $28,000
                                            </span>
                                            
                                            <span
                                                className='
                                                    flex
                                                    items-center
                                                    text-sm
                                                    text-red-500 dark:text-red-300
                                                    font-medium
                                                '
                                            >
                                                <FaCaretDown />

                                                <span>
                                                    -5.2%
                                                </span>
                                            </span>
                                        </span>
                                    </div>

                                    <span
                                        className='
                                            ml-auto
                                            text-red-500 dark:text-red-300
                                            font-medium
                                        '
                                    >
                                        -$1,500
                                    </span>
                                </div>

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
                                        src={ bitcoinImage } 
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
                                            bitcoin
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
                                                $28,000
                                            </span>
                                            
                                            <span
                                                className='
                                                    flex
                                                    items-center
                                                    text-sm
                                                    text-green-700 dark:text-green-300
                                                    font-medium
                                                '
                                            >
                                                <FaCaretUp />

                                                <span>
                                                    -5.2%
                                                </span>
                                            </span>
                                        </span>
                                    </div>

                                    <span
                                        className='
                                            ml-auto
                                            text-green-700 dark:text-green-300
                                            font-medium
                                        '
                                    >
                                        +$1,500
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* watchlist overview */}
                <h2
                    className='
                        text-3xl
                        mt-10
                        dark:text-white
                    '
                >
                    Recent Watchlist & Alerts
                </h2>
                
                {/* watchlist stats */}
                <div
                    className='
                        mt-10
                        grid
                        grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                        gap-8 lg:gap-10
                    '
                >
                    {/* top 3 gainers */}
                    <div>
                        <h3
                            className='
                                text-lg
                                font-medium
                                capitalize
                                dark:text-white
                            '
                        >
                            top gainers
                        </h3>

                        <div
                            className='
                                mt-3
                                flex
                                flex-col
                            '
                        >
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
                                    src={ bitcoinImage } 
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
                                        dark:text-white
                                    '
                                >
                                    <span
                                        className='
                                            font-medium
                                        '
                                    >
                                        bitcoin
                                    </span>

                                    <span
                                        className='
                                            flex
                                            gap-1
                                            items-center
                                        '
                                    >
                                        <span>
                                            $28,000
                                        </span>
                                    </span>
                                </div>

                                <span
                                    className='
                                        flex
                                        items-center
                                        text-red-500 dark:text-red-300
                                        font-medium
                                        ml-auto
                                    '
                                >
                                    <FaCaretDown />

                                    <span>
                                        -5.2%
                                    </span>
                                </span>
                            </div>
                            
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
                                    src={ bitcoinImage } 
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
                                        dark:text-white
                                    '
                                >
                                    <span
                                        className='
                                            font-medium
                                        '
                                    >
                                        bitcoin
                                    </span>

                                    <span
                                        className='
                                            flex
                                            gap-1
                                            items-center
                                        '
                                    >
                                        <span>
                                            $28,000
                                        </span>
                                    </span>
                                </div>

                                <span
                                    className='
                                        flex
                                        items-center
                                        text-green-700 dark:text-green-300
                                        font-medium
                                        ml-auto
                                    '
                                >
                                    <FaCaretUp />

                                    <span>
                                        -5.2%
                                    </span>
                                </span>
                            </div>
                            
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
                                    src={ bitcoinImage } 
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
                                        dark:text-white
                                    '
                                >
                                    <span
                                        className='
                                            font-medium
                                        '
                                    >
                                        bitcoin
                                    </span>

                                    <span
                                        className='
                                            flex
                                            gap-1
                                            items-center
                                        '
                                    >
                                        <span>
                                            $28,000
                                        </span>
                                    </span>
                                </div>

                                <span
                                    className='
                                        flex
                                        items-center
                                        text-red-500 dark:text-red-300
                                        font-medium
                                        ml-auto
                                    '
                                >
                                    <FaCaretDown />

                                    <span>
                                        -5.2%
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* top 3 losers */}
                    <div>
                        <h3
                            className='
                                text-lg
                                font-medium
                                capitalize
                                dark:text-white
                            '
                        >
                            top losers
                        </h3>

                        <div
                            className='
                                mt-3
                                flex
                                flex-col
                            '
                        >
                            {/* item */}
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
                                    src={ bitcoinImage } 
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
                                        dark:text-white
                                    '
                                >
                                    <span
                                        className='
                                            font-medium
                                        '
                                    >
                                        bitcoin
                                    </span>

                                    <span
                                        className='
                                            flex
                                            gap-1
                                            items-center
                                        '
                                    >
                                        <span>
                                            $28,000
                                        </span>
                                    </span>
                                </div>

                                <span
                                    className='
                                        flex
                                        items-center
                                        text-red-500 dark:text-red-300
                                        font-medium
                                        ml-auto
                                    '
                                >
                                    <FaCaretDown />

                                    <span>
                                        -5.2%
                                    </span>
                                </span>
                            </div>
                            
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
                                    src={ bitcoinImage } 
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
                                        dark:text-white
                                    '
                                >
                                    <span
                                        className='
                                            font-medium
                                        '
                                    >
                                        bitcoin
                                    </span>

                                    <span
                                        className='
                                            flex
                                            gap-1
                                            items-center
                                        '
                                    >
                                        <span>
                                            $28,000
                                        </span>
                                    </span>
                                </div>

                                <span
                                    className='
                                        flex
                                        items-center
                                        text-green-700 dark:text-green-300
                                        font-medium
                                        ml-auto
                                    '
                                >
                                    <FaCaretUp />

                                    <span>
                                        -5.2%
                                    </span>
                                </span>
                            </div>
                            
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
                                    src={ bitcoinImage } 
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
                                        dark:text-white
                                    '
                                >
                                    <span
                                        className='
                                            font-medium
                                        '
                                    >
                                        bitcoin
                                    </span>

                                    <span
                                        className='
                                            flex
                                            gap-1
                                            items-center
                                        '
                                    >
                                        <span>
                                            $28,000
                                        </span>
                                    </span>
                                </div>

                                <span
                                    className='
                                        flex
                                        items-center
                                        text-red-500 dark:text-red-300
                                        font-medium
                                        ml-auto
                                    '
                                >
                                    <FaCaretDown />

                                    <span>
                                        -5.2%
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* alerts */}
                    <div
                        className='
                            bg-gray-100 dark:bg-gray-700
                            p-4 lg:p-5
                            rounded-lg
                        '
                    >
                        <h3
                            className='
                                text-lg
                                font-medium
                                dark:text-white
                            '
                        >
                            Alerts
                        </h3>

                        <div
                            className='
                                mt-2
                            '
                        >
                            {/* alert */}
                            <div
                                className="
                                    flex
                                    gap-3
                                    items-center
                                    p-2 px-3
                                    rounded-lg
                                    hover:bg-gray-200 dark:hover:bg-gray-800
                                "
                            >
                                <img 
                                    src={ bitcoinImage } 
                                    alt="image of bitcoin" 
                                    className="
                                        w-10
                                        h-10
                                    "
                                />

                                <div
                                    className='
                                        dark:text-white
                                    '
                                >
                                    <span>
                                        Bitcoin Alert
                                    </span>

                                    <span
                                        className="
                                            -mt-1  
                                            flex
                                            gap-1
                                            items-center
                                        "
                                    >
                                        <FaArrowDown
                                            className="
                                                text-red-500 dark:text-red-300
                                            "
                                        />

                                        <span>
                                            $79000
                                        </span>
                                    </span>
                                </div>

                                <div
                                    className="
                                        ml-auto
                                        flex
                                        gap-2
                                        items-center
                                        *:text-white
                                        *:bg-green-700 *:hover:bg-green-900
                                        *:p-2
                                        *:rounded-full
                                    "
                                >
                                    <button>
                                        <FaPen/>
                                    </button>
                                    
                                    <button>
                                        <FaTrash/>
                                    </button>
                                </div>
                            </div>
                            
                            <div
                                className="
                                    flex
                                    gap-3
                                    items-center
                                    p-2 px-3
                                    rounded-lg
                                    hover:bg-gray-200 dark:hover:bg-gray-800
                                "
                            >
                                <img 
                                    src={ bitcoinImage } 
                                    alt="image of bitcoin" 
                                    className="
                                        w-10
                                        h-10
                                    "
                                />

                                <div
                                    className='
                                        dark:text-white
                                    '
                                >
                                    <span>
                                        Bitcoin Alert
                                    </span>

                                    <span
                                        className="
                                            -mt-1  
                                            flex
                                            gap-1
                                            items-center
                                        "
                                    >
                                        <FaArrowDown
                                            className="
                                                text-red-500 dark:text-red-300
                                            "
                                        />

                                        <span>
                                            $79000
                                        </span>
                                    </span>
                                </div>

                                <div
                                    className="
                                        ml-auto
                                        flex
                                        gap-2
                                        items-center
                                        *:text-white
                                        *:bg-green-700 *:hover:bg-green-900
                                        *:p-2
                                        *:rounded-full
                                    "
                                >
                                    <button>
                                        <FaPen/>
                                    </button>
                                    
                                    <button>
                                        <FaTrash/>
                                    </button>
                                </div>
                            </div>
                            
                            <div
                                className="
                                    flex
                                    gap-3
                                    items-center
                                    p-2 px-3
                                    rounded-lg
                                    hover:bg-gray-200 dark:hover:bg-gray-800
                                "
                            >
                                <img 
                                    src={ bitcoinImage } 
                                    alt="image of bitcoin" 
                                    className="
                                        w-10
                                        h-10
                                    "
                                />

                                <div
                                    className='
                                        dark:text-white
                                    '
                                >
                                    <span>
                                        Bitcoin Alert
                                    </span>

                                    <span
                                        className="
                                            -mt-1  
                                            flex
                                            gap-1
                                            items-center
                                        "
                                    >
                                        <FaArrowDown
                                            className="
                                                text-red-500 dark:text-red-300
                                            "
                                        />

                                        <span>
                                            $79000
                                        </span>
                                    </span>
                                </div>

                                <div
                                    className="
                                        ml-auto
                                        flex
                                        gap-2
                                        items-center
                                        *:text-white
                                        *:bg-green-700 *:hover:bg-green-900
                                        *:p-2
                                        *:rounded-full
                                    "
                                >
                                    <button>
                                        <FaPen/>
                                    </button>
                                    
                                    <button>
                                        <FaTrash/>
                                    </button>
                                </div>
                            </div>
                            
                            <div
                                className="
                                    flex
                                    gap-3
                                    items-center
                                    p-2 px-3
                                    rounded-lg
                                    hover:bg-gray-200 dark:hover:bg-gray-800
                                "
                            >
                                <img 
                                    src={ bitcoinImage } 
                                    alt="image of bitcoin" 
                                    className="
                                        w-10
                                        h-10
                                    "
                                />

                                <div
                                    className='
                                        dark:text-white
                                    '
                                >
                                    <span>
                                        Bitcoin Alert
                                    </span>

                                    <span
                                        className="
                                            -mt-1  
                                            flex
                                            gap-1
                                            items-center
                                        "
                                    >
                                        <FaArrowDown
                                            className="
                                                text-red-500 dark:text-red-300
                                            "
                                        />

                                        <span>
                                            $79000
                                        </span>
                                    </span>
                                </div>

                                <div
                                    className="
                                        ml-auto
                                        flex
                                        gap-2
                                        items-center
                                        *:text-white
                                        *:bg-green-700 *:hover:bg-green-900
                                        *:p-2
                                        *:rounded-full
                                    "
                                >
                                    <button>
                                        <FaPen/>
                                    </button>
                                    
                                    <button>
                                        <FaTrash/>
                                    </button>
                                </div>
                            </div>
                            
                            <div
                                className="
                                    flex
                                    gap-3
                                    items-center
                                    p-2 px-3
                                    rounded-lg
                                    hover:bg-gray-200 dark:hover:bg-gray-800
                                "
                            >
                                <img 
                                    src={ bitcoinImage } 
                                    alt="image of bitcoin" 
                                    className="
                                        w-10
                                        h-10
                                    "
                                />

                                <div
                                    className='
                                        dark:text-white
                                    '
                                >
                                    <span>
                                        Bitcoin Alert
                                    </span>

                                    <span
                                        className="
                                            -mt-1  
                                            flex
                                            gap-1
                                            items-center
                                        "
                                    >
                                        <FaArrowDown
                                            className="
                                                text-red-500 dark:text-red-300
                                            "
                                        />

                                        <span>
                                            $79000
                                        </span>
                                    </span>
                                </div>

                                <div
                                    className="
                                        ml-auto
                                        flex
                                        gap-2
                                        items-center
                                        *:text-white
                                        *:bg-green-700 *:hover:bg-green-900
                                        *:p-2
                                        *:rounded-full
                                    "
                                >
                                    <button>
                                        <FaPen/>
                                    </button>
                                    
                                    <button>
                                        <FaTrash/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>} 

            <Outlet />
        </div>
    )
}
