import { Outlet, Await, useLoaderData, useNavigate } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { useTheme } from '../../../shared/providers/ThemeProvider.jsx'
import colors from "tailwindcss/colors"
import RouteError from '../../../shared/components/RouteError.jsx'
import RouteHeading from '../../../shared/components/RouteHeading.jsx'
import ThemedAlertItem from '../../../shared/components/ThemedAlertItem.jsx'
import bitcoinImage from '../../../assets/Design/bitcoin.png'
import LoadMoreButton from '../../../shared/components/LoadMoreButton.jsx'
import WatchlistCard from '../components/WatchlistCard.jsx'
import { Suspense } from 'react'
import { useAppData } from '../../../shared/layouts/AppLayout.jsx'
import { useAuthProvider } from '../../../shared/providers/AuthProvider.jsx'
import { FaTriangleExclamation } from 'react-icons/fa6'
import { formatAsCurrency } from '../../../shared/utils/formatAsCurrency.jsx'

export default function Watchlist() {
    const { theme } = useTheme()
    
    const { watchlistData } = useLoaderData()
    const { currentlyLoggedInUser } = useAuthProvider()

    const { conversionRate } = useAppData()

    const navigateTo = useNavigate()

    return (    
        <div>
            <Suspense fallback={
                <div
                    className='
                        flex
                        gap-4
                        items-center
                        justify-center
                    '
                >
                    <ScaleLoader
                        color={ theme == "light" ? colors.gray['800'] : colors.white }
                        loading={ true }
                        height={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />

                    <span
                        className='
                            text-lg
                            font-medium
                            dark:text-white
                        '
                    >
                        Loading your watchlist...
                    </span>
                </div>
            }>
                <Await 
                    resolve={ watchlistData }
                    errorElement={
                        <RouteError
                            title="Failed to load watchlist"
                            message="An error occured loading your watchlist, Please try again later."
                            handleRetry={() => function(){} }
                        />
                    }
                >
                    { ({ data }) => (
                        <div>
                            {/* watchlist heading */}
                            <RouteHeading>
                                Welcome, { 
                                    currentlyLoggedInUser.data.name.split(" ")[0]
                                }
                            </RouteHeading>

                            {/* watchlist items */}
                            { data.assets.length > 0 && <div
                                className='
                                    mt-8
                                    grid
                                    grid-cols-1
                                    md:grid-cols-2
                                    lg:grid-cols-3
                                    gap-6
                                '
                            >
                                {
                                    data.assets.map( function( asset ) {
                                        return (
                                            <WatchlistCard 
                                                key={asset.id}
                                                id={ asset.id }
                                                name={ asset.name }
                                                imageSrc={ asset.image }
                                                price={
                                                    formatAsCurrency(
                                                        asset.price * conversionRate,
                                                        currentlyLoggedInUser.data.preferred_currency
                                                    )
                                                }
                                                percentChange={ asset.percent_change_24h }
                                                sparklineData={[
                                                    {
                                                        name: asset.name,
                                                        data: asset.sparkline
                                                    }
                                                ]}
                                            />
                                        )
                                    })
                                }
                            </div>}

                            {/* no watchlist items ui */}
                            {
                                data.assets.length === 0 && <div
                                    className='
                                        w-9/10
                                        max-w-lg
                                        mx-auto
                                    '
                                >
                                    <FaTriangleExclamation/>

                                    <span
                                        className='
                                            mt-4
                                            text-center
                                            text-lg
                                            font-medium
                                            dark:text-white
                                        '
                                    >
                                        You haven't added any coins to your watchlist yet. 
                                        Search and add coins to your watchlist to see them here.
                                    </span>
                                </div>
                            }

                            {/* load more button for pagination */}
                            { 
                                (
                                    data.assets.length > 0 &&
                                    data.total_assets > data.assets.length
                                ) && 
                                <LoadMoreButton 
                                    handleLoadMore={function() {
                                        let currentLimit = data.assets.length
                                        let newLimit = 
                                            ( ( ( currentLimit + 10 ) - data.total_assets ) > 10) ? 
                                            currentLimit + 10 : 
                                            data.total_assets

                                        navigateTo(`/app/dashboard?limit=${ newLimit }`, { replace: true })
                                    }}
                                    className={"mt-4"}
                                />
                            }
                        </div>
                    )}
                </Await>
            </Suspense>
            {/* {
                <div
                    className='
                        flex
                        gap-4
                        items-center
                        justify-center
                    '
                >
                    <ScaleLoader
                        color={ theme == "light" ? colors.gray['800'] : colors.white }
                        loading={ true }
                        height={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />

                    <span
                        className='
                            text-lg
                            font-medium
                            dark:text-white
                        '
                    >
                        Loading your watchlist...
                    </span>
                </div>
            } */}

            {/* watchlist error state */}
            {/* { 
                false && <RouteError
                    title="Failed to load watchlist"
                    message="An error occured loading your watchlist, Please try again later. Error: Err_network_failed"
                    handleRetry={() => function(){} }
                />
            } */}

            {/* watchlist loaded state & watchlist content */}


            {/* outlet for the asset details route */}
            <Outlet />
        </div>
    )
}
