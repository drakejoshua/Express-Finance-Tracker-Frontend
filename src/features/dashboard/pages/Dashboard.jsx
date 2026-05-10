import { Suspense } from "react";
import { Outlet, useLoaderData, Await } from "react-router-dom";
import bitcoinImage from "../../../assets/Design/bitcoin.png";
import {
  FaArrowDown,
  FaCaretDown,
  FaCaretUp,
  FaPen,
  FaTrash,
  FaTriangleExclamation,
} from "react-icons/fa6";
import RouteError from "../../../shared/components/RouteError";
import ItemSkeleton from "../components/ItemSkeleton";
import AlertSkeleton from "../components/AlertSkeleton";
import { useTheme } from "../../../shared/providers/ThemeProvider.jsx";
import PortfolioItem from "../components/PortfolioItem.jsx";
import WatchlistItem from "../components/WatchlistItem.jsx";
import ThemedAlertItem from "../../../shared/components/ThemedAlertItem.jsx";
import Chart from "react-apexcharts/core";
import "apexcharts/area";
import ThemedCoinChart from "../../../shared/components/ThemedCoinChart.jsx";
import RouteHeading from "../../../shared/components/RouteHeading.jsx";
import { useAuthProvider } from '../../../shared/providers/AuthProvider.jsx';
import { useAppData } from "../../../shared/layouts/AppLayout.jsx"
import PercentChangeIndicator from "../../../shared/components/PercentChangeIndicator.jsx";
import { formatAsCurrency } from "../../../shared/utils/formatAsCurrency.jsx";



export default function Dashboard() {
  const { theme } = useTheme();

  const { portfolioSummary } = useLoaderData()
  const { currentlyLoggedInUser } = useAuthProvider()

  const { conversionRate } = useAppData()

  return (
    <div className={`${theme == "dark" ? "route-dark" : ""}`}>
        <Suspense
            fallback={
                <div>
                    {/* greeting */}
                    <h1
                        className="
                                    mt-5
                                    text-3xl
                                    font-medium
                                    dark:text-white
                                "
                    >
                        Welcome, Joshua
                    </h1>

                    {/* portfolio overview */}
                    <div
                        className="
                                    mt-10
                                    bg-gray-100 dark:bg-gray-700 
                                    rounded-lg
                                    p-5 py-8 lg:p-8
                                "
                    >
                        <h2
                        className="
                                        lg:text-lg
                                        font-medium
                                        text-gray-700 dark:text-gray-100
                                    "
                        >
                        Portfolio Overview
                        </h2>

                        {/* portfolio balance */}
                        <div
                        className="
                                        mt-4
                                        flex
                                        items-center
                                        gap-3
                                    "
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
                        className="
                                        mt-10
                                        h-84
                                        w-full
                                        rounded-lg
                                        skeleton
                                    "
                        ></div>

                        {/* portfolio stats */}
                        <div
                        className="
                                        mt-10
                                        grid
                                        grid-cols-1 md:grid-cols-2
                                        gap-8 lg:gap-20
                                    "
                        >
                        <div>
                            <h3
                            className="
                                                text-lg
                                                font-medium
                                                capitalize
                                                dark:text-white
                                            "
                            >
                            top gainers
                            </h3>

                            {/* top 3 gainers */}
                            <div
                            className="
                                                mt-3
                                                flex
                                                flex-col
                                            "
                            >
                            <ItemSkeleton />

                            <ItemSkeleton />

                            <ItemSkeleton />
                            </div>
                        </div>

                        {/* top 3 losers */}
                        <div>
                            <h3
                            className="
                                                text-lg
                                                font-medium
                                                capitalize
                                                dark:text-white
                                            "
                            >
                            top losers
                            </h3>

                            <div
                            className="
                                                mt-3
                                                flex
                                                flex-col
                                            "
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
                        className="
                                    text-3xl
                                    mt-10
                                    dark:text-white
                                "
                    >
                        Recent Watchlist & Alerts
                    </h2>

                    {/* watchlist stats */}
                    <div
                        className="
                                    mt-10
                                    grid
                                    grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                                    gap-8 lg:gap-10
                                "
                    >
                        {/* top 3 gainers */}
                        <div>
                        <h3
                            className="
                                            text-lg
                                            font-medium
                                            capitalize
                                            dark:text-white
                                        "
                        >
                            top gainers
                        </h3>

                        <div
                            className="
                                            mt-3
                                            flex
                                            flex-col
                                        "
                        >
                            <ItemSkeleton />

                            <ItemSkeleton />

                            <ItemSkeleton />
                        </div>
                        </div>

                        {/* top 3 losers */}
                        <div>
                        <h3
                            className="
                                            text-lg
                                            font-medium
                                            capitalize
                                            dark:text-white
                                        "
                        >
                            top losers
                        </h3>

                        <div
                            className="
                                            mt-3
                                            flex
                                            flex-col
                                        "
                        >
                            {/* item */}
                            <ItemSkeleton />

                            <ItemSkeleton />

                            <ItemSkeleton />
                        </div>
                        </div>

                        {/* alerts */}
                        <div
                        className="
                                        bg-gray-100 dark:bg-gray-700
                                        p-4 lg:p-5
                                        rounded-lg
                                    "
                        >
                        <h3
                            className="
                                            text-lg
                                            font-medium
                                            dark:text-white
                                        "
                        >
                            Alerts
                        </h3>

                        <div
                            className="
                                mt-2
                            "
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
                </div>
            }
        >
            <Await
                resolve={ portfolioSummary }
            >
                {
                    ( { data } ) => (
                        <div>
                            {/* greeting */}
                            <RouteHeading>
                                Welcome, { 
                                    currentlyLoggedInUser.data.name.split(" ")[0]
                                }
                            </RouteHeading>

                            {/* portfolio overview */}
                            <div
                                className="
                                    mt-10
                                    bg-gray-100 dark:bg-gray-700 
                                    rounded-lg
                                    p-5 py-8 lg:p-8
                                "
                            >
                                <h2
                                    className="
                                        lg:text-lg
                                        font-medium
                                        text-gray-700 dark:text-gray-100
                                    "
                                >
                                    Portfolio Overview
                                </h2>

                                {/* portfolio balance */}
                                <div
                                    className="
                                        mt-2
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >
                                    <span
                                        className="
                                            text-4xl lg:text-5xl
                                            font-medium
                                            dark:text-white
                                        "
                                    >
                                        { 
                                            formatAsCurrency(
                                                data.summary.balance * conversionRate,
                                                currentlyLoggedInUser.data.preferred_currency
                                            )
                                        }
                                    </span>

                                    <PercentChangeIndicator
                                        percentChange={ 
                                            data.summary.total_percent_change === null ?
                                            0 :
                                            data.summary.total_percent_change
                                        }
                                    />
                                </div>

                                {/* portfolio chart */}
                                <div
                                    className="
                                        mt-3
                                        h-84
                                        w-full
                                        rounded-lg
                                    "
                                >
                                    {/* chart data ui */}
                                    {
                                        ( data.total_assets > 0 ) &&
                                        <ThemedCoinChart
                                            data={[
                                                ...data.summary.top_gainers.map(
                                                    function( { name, sparkline } ) {
                                                        return {
                                                            name,
                                                            data: sparkline
                                                        }
                                                    }
                                                ),
                                                ...data.summary.top_losers.map(
                                                    function( { name, sparkline } ) {
                                                        return {
                                                            name,
                                                            data: sparkline
                                                        }
                                                    }
                                                )
                                            ]}
                                            isInteractive={true}
                                        />
                                    }

                                    {/* no chart data ui */}
                                    {
                                        ( data.total_assets === 0 ) &&
                                        <div
                                            className="
                                                h-full
                                                flex
                                                flex-col
                                                items-center
                                                justify-center
                                                gap-3
                                            "
                                        >
                                            <FaTriangleExclamation
                                                className="
                                                    text-4xl
                                                    text-gray-400 dark:text-gray-500
                                                "
                                            />

                                            <p
                                                className="
                                                    text-gray-500 dark:text-gray-400
                                                "
                                            >
                                                No portfolio data to display. Start 
                                                adding assets to your portfolio to see 
                                                insights and charts here.
                                            </p>
                                        </div>
                                    }
                                </div>

                                {/* portfolio stats */}
                                {
                                    ( data.total_assets > 0 ) &&
                                    <div
                                        className="
                                            mt-6
                                            grid
                                            grid-cols-1 md:grid-cols-2
                                            gap-8 lg:gap-20
                                        "
                                    >
                                        {/* top 3 gainers */}
                                        <div>
                                            <h3
                                                className="
                                                    text-lg
                                                    font-medium
                                                    capitalize
                                                    dark:text-white
                                                "
                                            >
                                                top gainers
                                            </h3>

                                            {/* top 3 gainers */}
                                            <div
                                                className="
                                                    mt-3
                                                    flex
                                                    flex-col
                                                "
                                            >
                                                {
                                                    data.summary.top_gainers.map(
                                                        function( asset ) {
                                                            return (
                                                                <PortfolioItem
                                                                    key={asset.id}
                                                                    id={asset.id}
                                                                    image={asset.image}
                                                                    name={asset.name}
                                                                    price={ formatAsCurrency( 
                                                                        asset.price * conversionRate, 
                                                                        currentlyLoggedInUser.data.preferred_currency 
                                                                    ) }
                                                                    percentChange={asset.percent_change_24h}
                                                                    balanceChange={asset.balance_change_24h}
                                                                />
                                                            );
                                                        }
                                                    )
                                                }
                                            </div>
                                        </div>

                                        {/* top 3 losers */}
                                        <div>
                                            <h3
                                                className="
                                                    text-lg
                                                    font-medium
                                                    capitalize
                                                    dark:text-white
                                                "
                                            >
                                                top losers
                                            </h3>

                                            <div
                                                className="
                                                    mt-3
                                                    flex
                                                    flex-col
                                                "
                                            >
                                                {
                                                    data.summary.top_losers.map(
                                                        function( asset ) {
                                                            return (
                                                                <PortfolioItem
                                                                    key={asset.id}
                                                                    id={asset.id}
                                                                    image={asset.image}
                                                                    name={asset.name}
                                                                    price={ formatAsCurrency( 
                                                                        asset.price * conversionRate, 
                                                                        currentlyLoggedInUser.data.preferred_currency 
                                                                    ) }
                                                                    percentChange={asset.percent_change_24h}
                                                                    balanceChange={asset.balance_change_24h}
                                                                />
                                                            );
                                                        }
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                }
            </Await>
        </Suspense>

        <Outlet />
    </div>
  );
}
