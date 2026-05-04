import React from 'react'
import { Outlet } from 'react-router-dom'
import bitcoinImage from '../../../assets/Design/bitcoin.png'
import { FaArrowDown, FaCaretDown, FaCaretUp, FaPen, FaTrash, FaTriangleExclamation } from 'react-icons/fa6'
import RouteError from '../../../shared/components/RouteError'
import ItemSkeleton from '../components/ItemSkeleton'
import AlertSkeleton from '../components/AlertSkeleton'
import { useTheme } from '../../../shared/providers/ThemeProvider.jsx'
import PortfolioItem from '../components/PortfolioItem.jsx'
import WatchlistItem from '../components/WatchlistItem.jsx'
import ThemedAlertItem from '../../../shared/components/ThemedAlertItem.jsx'
import Chart from 'react-apexcharts/core'
import 'apexcharts/area'
import colors from 'tailwindcss/colors'
import CoinChart from '../../../shared/components/CoinChart.jsx'
import RouteHeading from '../../../shared/components/RouteHeading.jsx'


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
            { true && <div>
                {/* greeting */}
                <RouteHeading>
                    Welcome, Joshua
                </RouteHeading>

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
                            mt-3
                            h-84
                            w-full
                            rounded-lg
                        '
                    >
                        <CoinChart 
                            data={[
                                {
                                    name: "bitcoin",
                                    data: [ 30, 45, 70, 55, 80, 45, 70, 55, 80, 45, 70, 55 ]
                                },
                                {
                                    name: "ethereum",
                                    data: [ 20, 55, 80, 65, 90, 40, 55, 80, 65, 90, 40, 55 ]
                                },
                                {
                                    name: "tron",
                                    data: [ 10, 75, 60, 85, 70, 10, 35, 50, 35, 80, 40, 25 ]
                                },
                                {
                                    name: "doge",
                                    data: [ 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75 ]
                                },
                                {
                                    name: "solana",
                                    data: [ 30, 75, 55, 95, 10, 30, 45, 70, 55, 90, 40, 85 ]
                                },
                                {
                                    name: "ripple",
                                    data: [ 65, 90, 40, 90, 40, 55, 30, 45, 70, 30, 35, 40 ]
                                },
                            ]}
                            isInteractive={true}
                        />
                    </div>

                    {/* portfolio stats */}
                    <div
                        className='
                            mt-6
                            grid
                            grid-cols-1 md:grid-cols-2
                            gap-8 lg:gap-20
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

                            {/* top 3 gainers */}
                            <div
                                className='
                                    mt-3
                                    flex
                                    flex-col
                                '
                            >
                                {/* red item */}
                                <PortfolioItem
                                    image={ bitcoinImage }
                                    name="bitcoin"
                                    price="$28,000"
                                    percentChange={ -5.2 }
                                    balanceChange="1,500"
                                />

                                {/* green item */}
                                <PortfolioItem
                                    image={ bitcoinImage }
                                    name="bitcoin"
                                    price="$28,000"
                                    percentChange={ 5.2 }
                                    balanceChange="1,500"
                                />

                                <PortfolioItem
                                    image={ bitcoinImage }
                                    name="bitcoin"
                                    price="$28,000"
                                    percentChange={ -5.2 }
                                    balanceChange="1,500"
                                />
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
                                <PortfolioItem
                                    image={ bitcoinImage }
                                    name="bitcoin"
                                    price="$28,000"
                                    percentChange={ 5.2 }
                                    balanceChange="1,500"
                                />

                               <PortfolioItem
                                    image={ bitcoinImage }
                                    name="bitcoin"
                                    price="$28,000"
                                    percentChange={ -5.2 }
                                    balanceChange="1,500"
                                />

                                {/* green item */}
                                <PortfolioItem
                                    image={ bitcoinImage }
                                    name="bitcoin"
                                    price="$28,000"
                                    percentChange={ 5.2 }
                                    balanceChange="1,500"
                                />
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
                            {/* red item */}
                            <WatchlistItem
                                image={ bitcoinImage }
                                name="bitcoin"
                                price="$28,000"
                                percentChange={ -5.2 }
                            />
                            
                            {/* green item */}
                            <WatchlistItem
                                image={ bitcoinImage }
                                name="bitcoin"
                                price="$28,000"
                                percentChange={ 5.2 }
                            />
                            
                            <WatchlistItem
                                image={ bitcoinImage }
                                name="bitcoin"
                                price="$28,000"
                                percentChange={ -5.2 }
                            />
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
                            {/* red item */}
                            <WatchlistItem
                                image={ bitcoinImage }
                                name="bitcoin"
                                price="$28,000"
                                percentChange={ -5.2 }
                            />
                            
                            {/* green item */}
                            <WatchlistItem
                                image={ bitcoinImage }
                                name="bitcoin"
                                price="$28,000"
                                percentChange={ 5.2 }
                            />
                            
                            <WatchlistItem
                                image={ bitcoinImage }
                                name="bitcoin"
                                price="$28,000"
                                percentChange={ -5.2 }
                            />
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
                            <ThemedAlertItem
                                imageSrc={ bitcoinImage }
                                title="Bitcoin Alert: Over $70k"
                                condition="below"
                                targetPrice="$79,000"
                                handleEdit={ () => {} }
                                handleDelete={ () => {} }
                            />
                            
                            <ThemedAlertItem
                                imageSrc={ bitcoinImage }
                                title="Bitcoin Alert"
                                condition="above"
                                targetPrice="$69,000"
                                handleEdit={ () => {} }
                                handleDelete={ () => {} }
                            />
                            
                            <ThemedAlertItem
                                imageSrc={ bitcoinImage }
                                title="Bitcoin Alert"
                                condition="below"
                                targetPrice="$79,000"
                                handleEdit={ () => {} }
                                handleDelete={ () => {} }
                            />
                            
                            <ThemedAlertItem
                                imageSrc={ bitcoinImage }
                                title="Bitcoin Alert"
                                condition="below"
                                targetPrice="$79,000"
                                handleEdit={ () => {} }
                                handleDelete={ () => {} }
                            />
                            
                            <ThemedAlertItem
                                imageSrc={ bitcoinImage }
                                title="Bitcoin Alert"
                                condition="above"
                                targetPrice="$129,000"
                                handleEdit={ () => {} }
                                handleDelete={ () => {} }
                            />
                        </div>
                    </div>
                </div>
            </div>} 

            <Outlet />
        </div>
    )
}
