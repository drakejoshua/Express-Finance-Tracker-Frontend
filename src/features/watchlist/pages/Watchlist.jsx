import React from 'react'
import { Outlet } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { useTheme } from '../../../shared/providers/ThemeProvider.jsx'
import colors from "tailwindcss/colors"
import RouteError from '../../../shared/components/RouteError.jsx'
import RouteHeading from '../../../shared/components/RouteHeading.jsx'

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
            </div>


            {/* outlet for the asset details route */}
            <Outlet />
        </div>
    )
}
