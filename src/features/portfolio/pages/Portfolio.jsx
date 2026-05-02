import React from 'react'
import { Outlet } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { useTheme } from '../../../shared/providers/ThemeProvider.jsx'
import colors from "tailwindcss/colors"
import RouteError from '../../../shared/components/RouteError.jsx'
import RouteHeading from '../../../shared/components/RouteHeading.jsx'
import bitcoinImage from '../../../assets/Design/bitcoin.png'
import { FaCaretDown, FaCaretUp, FaPen, FaTrash } from 'react-icons/fa6'
import PercentChangeIndicator from '../../../shared/components/PercentChangeIndicator.jsx'
import Button from '../../../shared/components/Button.jsx'
import CoinChart from '../../../shared/components/CoinChart.jsx'


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
                <div
                    className='
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-8
                        mt-8
                    '
                >
                    {/* portfolio item/coins */}
                    <div
                        className='
                            bg-gray-100 dark:bg-gray-700 
                            p-6
                            rounded-lg
                        '
                    >
                        {/* coin image and name */}
                        <div
                            className='
                                flex
                                gap-2
                            '
                        >
                            <img 
                                src={ bitcoinImage } 
                                alt="Bitcoin" 
                                className='
                                    w-6
                                    h-6
                                    object-cover
                                '
                            />

                            <span
                                className='
                                    capitalize
                                    dark:text-white
                                '
                            >
                                bitcoin
                            </span>
                        </div>

                        {/* coin portfolio balance, % balance change, current price */}
                        {/* and portfolio controls */}
                        <div
                            className='
                                flex
                                mt-2
                            '
                        >
                            <div
                                className='
                                    flex
                                    flex-col
                                    gap-1
                                '
                            >
                                {/* coin portfolio balance */}
                                <span
                                    className='
                                        text-4xl
                                        font-medium
                                        text-gray-800
                                        dark:text-white
                                    '
                                >
                                    $400,000
                                </span>

                                <div
                                    className='
                                        flex
                                        gap-2
                                        items-center
                                        text-lg
                                    '
                                >
                                    {/* coin current price */}
                                    <span className='dark:text-white'>
                                        ~ $95,000
                                    </span>

                                    {/* coin % balance change in portfolio */}
                                    <PercentChangeIndicator
                                        percentChange={-4.7}
                                        className='
                                            text-lg
                                        '
                                    />
                                </div>
                            </div>

                            <div
                                className='
                                    ml-auto
                                    flex
                                    items-center
                                    gap-2
                                '
                            >
                                {/* delete coin from portfolio button */}
                                <Button
                                    className="
                                        w-min
                                        p-3
                                        rounded-full
                                        text-xl
                                    "
                                >
                                    <FaTrash />
                                </Button>
                                
                                {/* edit portfolio coin details button */}
                                <Button
                                    className="
                                        w-min
                                        p-3
                                        rounded-full
                                        text-xl
                                    "
                                >
                                    <FaPen />
                                </Button>
                            </div>
                        </div>

                        {/* coin sparkline chart */}
                        <div
                            className='
                                h-40
                                w-[104%]
                                relative
                                -left-4
                            '
                        >
                            <CoinChart 
                                data={[
                                    {
                                        name: "bitcoin",
                                        data: [ 30, 45, 70, 55, 80, 45, 70, 55, 80, 45, 70, 55 ]
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
