import React from 'react'
import { Outlet } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { useTheme } from '../../../shared/providers/ThemeProvider.jsx'
import colors from "tailwindcss/colors"
import RouteError from '../../../shared/components/RouteError.jsx'
import RouteHeading from '../../../shared/components/RouteHeading.jsx'
import bitcoinImage from '../../../assets/Design/bitcoin.png'
import { FaArrowRotateLeft, FaCaretDown, FaCaretUp, FaPen, FaTrash } from 'react-icons/fa6'
import PercentChangeIndicator from '../../../shared/components/PercentChangeIndicator.jsx'
import Button from '../../../shared/components/Button.jsx'
import CoinChart from '../../../shared/components/CoinChart.jsx'
import PortfolioCard from '../components/PortfolioCard.jsx'
import LoadMoreButton from '../../../shared/components/LoadMoreButton.jsx'


export default function Portfolio() {
    const { theme } = useTheme()

    return (
        <div>
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
                    <PortfolioCard
                        name="Bitcoin"
                        imageSrc={ bitcoinImage }
                        balance="120,000,069.00"
                        price="23,456.78"
                        percentChange={ 5.67 }
                        sparklineData={[
                            {
                                name: "bitcoin",
                                data: [ 30, 45, 70, 55, 80, 45, 70, 55, 80, 45, 70, 55 ]
                            }
                        ]}
                    />
                    
                    <PortfolioCard
                        name="Ethereum"
                        imageSrc={ bitcoinImage }
                        balance="100,069.00"
                        price="2,456.78"
                        percentChange={ -1.07 }
                        sparklineData={[
                            {
                                name: "bitcoin",
                                data: [ 30, 45, 70, 55, 80, 45, 70, 55, 80, 45, 70, 55 ]
                            }
                        ]}
                    />
                    
                    <PortfolioCard
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
                    
                    <PortfolioCard
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
                </div>
            </div>

            {/* load more button for pagination */}
            { false && <LoadMoreButton 
                className={"mt-4"}
            />}

            {/* outlet for the asset details route */}
            <Outlet />
        </div>
    )
}
