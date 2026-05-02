import React from 'react'
import { Outlet } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { useTheme } from '../../../shared/providers/ThemeProvider.jsx'
import colors from "tailwindcss/colors"
import RouteError from '../../../shared/components/RouteError.jsx'
import RouteHeading from '../../../shared/components/RouteHeading.jsx'


export default function Portfolio() {
    const { theme } = useTheme()

    return (
        <div
            className='
                mt-5
            '
        >
            {/* portfolio loading state */}
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
                        Loading your portfolio...
                    </span>
                </div>
            }

            {/* portfolio error state */}
            { 
                false && <RouteError
                    title="Failed to load portfolio"
                    message="An error occured loading your portfolio, Please try again later. Error: Err_network_failed"
                    handleRetry={() => function(){} }
                />
            }

            {/* portfolio loaded state & portfolio content */}
            <div>
                {/* portfolio heading */}
                <RouteHeading>
                    Your Portfolio
                </RouteHeading>

                {/* portfolio items */}
                <div>
                    {/* portfolio item */}
                </div>
            </div>
            <Outlet />
        </div>
    )
}
