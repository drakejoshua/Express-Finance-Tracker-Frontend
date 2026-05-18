/* 
    Watchlist.jsx

    This page displays the user's watchlist, showing all the coins they have 
    added to their watchlist. It fetches the watchlist data using a loader 
    and displays it in a grid format. Each coin in the watchlist is displayed 
    using the WatchlistCard component, which shows the coin's image, name, 
    current price, percentage change, and a sparkline chart of its price movement. 
    The page also handles loading and error states while fetching the watchlist 
    data. If there are more coins in the watchlist than currently displayed, a 
    "Load More" button is shown to allow users to load more coins. Additionally, 
    the page includes an Outlet for nested routes, such as the asset details page 
    when a user clicks on a coin in their watchlist.
*/



// import required dependencies and components
import { Outlet, Await, useLoaderData, useNavigate, useRevalidator } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { useTheme } from '../../../shared/providers/ThemeProvider.jsx'
import colors from "tailwindcss/colors"
import RouteError from '../../../shared/components/RouteError.jsx'
import RouteHeading from '../../../shared/components/RouteHeading.jsx'
import ThemedAlertItem from '../../../shared/components/ThemedAlertItem.jsx'
import LoadMoreButton from '../../../shared/components/LoadMoreButton.jsx'
import WatchlistCard from '../components/WatchlistCard.jsx'
import { Suspense } from 'react'
import { useAppData } from '../../../shared/layouts/AppLayout.jsx'
import { useAuthProvider } from '../../../shared/providers/AuthProvider.jsx'
import { FaTriangleExclamation } from 'react-icons/fa6'
import { formatAsCurrency } from '../../../shared/utils/formatAsCurrency.jsx'



export default function Watchlist() {
    // get theme from theme provider to set loader color 
    // based on current theme
    const { theme } = useTheme()
    
    // get watchlist data from loader using useLoaderData hook to
    // display user's watchlist
    const { watchlistData } = useLoaderData()

    // get currently logged in user data and processCurrentUserChange 
    // function from auth provider to update user data in auth context 
    // if there are any changes to user data such as changes to watchlist
    const { 
        currentlyLoggedInUser, 
        processCurrentUserChange 
    } = useAuthProvider()

    // get conversion rate from app data context to convert 
    // coin prices to user's preferred currency before displaying 
    // them in the watchlist
    const { conversionRate } = useAppData()

    // navigate function from react router to navigate user to 
    // different routes such as navigating to asset details page when user clicks
    // on a coin in their watchlist or navigating to dashboard with updated limit 
    // query param on pagination
    const navigateTo = useNavigate()

    // revalidator from react router to revalidate watchlist data after 
    // user deletes a coin from their watchlist to update the UI with 
    // latest data
    const revalidator = useRevalidator();

    return (    
        <div>
            {/* use suspense to handle loading states while waiting for watchlist data */}
            {/* promise to resolve  */}
            <Suspense fallback={
                // loading state UI while waiting for watchlist data to load, 
                // shows a spinner and loading message
                <div
                    className='
                        flex
                        gap-4
                        items-center
                        justify-center
                    '
                >
                    {/* loading spinner */}
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
                {/* watchlist content */}
                <Await 
                    resolve={ watchlistData }
                    errorElement={
                        // error state UI if there was an error loading the watchlist data,
                        // shows an error message and a retry button to revalidate the data
                        <RouteError
                            title="Failed to load watchlist"
                            message="An error occured loading your watchlist, Please try again later."
                            handleRetry={() => revalidator.revalidate() }
                        />
                    }
                >
                    { function({ data, newUserData }) {
                        // check if there is any new user data from the loader 
                        // (which means there was a change to user data such as changes to watchlist) 
                        // and update the auth context with the new user data to keep it in sync 
                        // with latest user data after any changes to user data such as changes 
                        // to watchlist
                        if ( newUserData ) {
                            processCurrentUserChange( newUserData )
                        }

                        return (<div>
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
                                    // loop over watchlist assets and display each asset 
                                    // in a WatchlistCard component, passing necessary data 
                                    // as props to the component
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
                                        flex
                                        gap-6
                                        items-center
                                        mt-6
                                    '
                                >
                                    <FaTriangleExclamation
                                        className="
                                            shrink-0
                                            text-3xl 
                                            text-green-600 dark:text-green-400
                                        "
                                    />

                                    <span
                                        className='
                                            text-lg
                                            font-medium
                                            dark:text-white
                                            text-gray-700
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
                        </div>)
                    }}
                </Await>
            </Suspense>
            

            {/* outlet for the asset details route */}
            <Outlet />
        </div>
    )
}
