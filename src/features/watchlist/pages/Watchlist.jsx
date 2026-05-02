import { Outlet } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { useTheme } from '../../../shared/providers/ThemeProvider.jsx'
import colors from "tailwindcss/colors"
import RouteError from '../../../shared/components/RouteError.jsx'
import RouteHeading from '../../../shared/components/RouteHeading.jsx'
import ThemedAlertItem from '../../../shared/components/ThemedAlertItem.jsx'
import bitcoinImage from '../../../assets/Design/bitcoin.png'
import LoadMoreButton from '../../../shared/components/LoadMoreButton.jsx'
import WatchlistCard from '../components/WatchlistCard.jsx'

export default function Watchlist() {
    const { theme } = useTheme()

    return (    
        <div>
            {/* watchlist loading state */}
            {
                false && <div
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
            }

            {/* watchlist error state */}
            { 
                false && <RouteError
                    title="Failed to load watchlist"
                    message="An error occured loading your watchlist, Please try again later. Error: Err_network_failed"
                    handleRetry={() => function(){} }
                />
            }

            {/* watchlist loaded state & watchlist content */}
            <div>
                {/* watchlist heading */}
                <RouteHeading>
                    Your watchlist
                </RouteHeading>

                {/* alerts */}
                <div
                    className='
                        w-full
                        bg-gray-100 dark:bg-gray-700 
                        mt-8
                        py-6 px-5 lg:p-8
                        rounded-lg
                    '
                >
                    {/* heading */}
                    <h2
                        className="
                            dark:text-white
                            text-xl
                            font-medium
                        "
                    >
                        Created Coin Alerts
                    </h2>

                    {/* alert list and items */}
                    <div
                        className='
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            lg:grid-cols-3
                            gap-x-6 gap-y-1
                            mt-2 lg:mt-4
                        '
                    >
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
                    </div>

                    {/* load more button for alert item pagination */}
                    { false && <LoadMoreButton 
                        className={"mt-4"}
                    />}
                </div>

                {/* watchlist items */}
                <div
                    className='
                        mt-14
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-6
                    '
                >
                    <WatchlistCard 
                        name="Ripple"
                        imageSrc={ bitcoinImage }
                        balance="30,069.00"
                        price="56.78"
                        percentChange={ 2.70 }
                        sparklineData={[
                            {
                                name: "bitcoin",
                                data: [ 30, 45, 70, 55, 80, 45, 70, 55, 80, 45, 70, 55 ]
                            }
                        ]}
                    />
                    
                    <WatchlistCard 
                        name="Ripple"
                        imageSrc={ bitcoinImage }
                        balance="30,069.00"
                        price="56.78"
                        percentChange={ -12.07 }
                        sparklineData={[
                            {
                                name: "bitcoin",
                                data: [ 30, 45, 70, 55, 80, 45, 70, 55, 80, 45, 70, 55 ]
                            }
                        ]}
                    />
                    
                    <WatchlistCard 
                        name="Ripple"
                        imageSrc={ bitcoinImage }
                        balance="30,069.00"
                        price="56.78"
                        percentChange={ 2.70 }
                        sparklineData={[
                            {
                                name: "bitcoin",
                                data: [ 30, 45, 70, 55, 80, 45, 70, 55, 80, 45, 70, 55 ]
                            }
                        ]}
                    />
                    
                    <WatchlistCard 
                        name="Ripple"
                        imageSrc={ bitcoinImage }
                        balance="30,069.00"
                        price="56.78"
                        percentChange={ -22.05 }
                        sparklineData={[
                            {
                                name: "bitcoin",
                                data: [ 30, 45, 70, 55, 80, 45, 70, 55, 80, 45, 70, 55 ]
                            }
                        ]}
                    />
                </div>

                {/* load more button for pagination */}
                { false && <LoadMoreButton 
                    className={"mt-4"}
                />}
            </div>


            {/* outlet for the asset details route */}
            <Outlet />
        </div>
    )
}
