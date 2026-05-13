import { Dialog, ToggleGroup, VisuallyHidden, Form } from "radix-ui"
import { 
    FaArrowDown, 
    FaArrowRotateLeft, 
    FaBell, 
    FaCaretDown, 
    FaPen, 
    FaPlus, 
    FaSpinner, 
    FaStar, 
    FaTrash, 
    FaTriangleExclamation, 
    FaXmark
} from "react-icons/fa6"
import bitcoinImage from "../../assets/Design/bitcoin.png"
import Button from "../components/Button"
import { useLoaderData, useNavigate, Await, useFetcher, useActionData, useSubmit, useNavigation, useRevalidator } from "react-router-dom"
import AltButton from "../components/AltButton"
import AlertItem from "../components/AlertItem"
import RouteError from "../components/RouteError"
import CoinChart from "../components/CoinChart"
import { Suspense, useState } from "react"
import { formatAsCurrency } from "../utils/formatAsCurrency"
import { useAuthProvider } from "../providers/AuthProvider.jsx"
import { useAppData } from "../layouts/AppLayout"
import PercentChangeIndicator from "../components/PercentChangeIndicator"
import { DialogComponent } from "../providers/DialogProvider.jsx"
import TextField from "../components/TextField.jsx"
import { useToastProvider } from "../providers/ToastProvider.jsx"
import { useEffect } from "react"

export default function AssetDetails() {
    const navigateTo = useNavigate()

    const { assetDetails } = useLoaderData()

    const fetcher = useFetcher()
    const state = fetcher.state
    const { status, error, method } = fetcher.data || {}

    const revalidator = useRevalidator();

    const { currentlyLoggedInUser } = useAuthProvider()
    const { conversionRate } = useAppData()

    const { showToast } = useToastProvider()

    const supportedChartRanges = ["1D","7D","1M","3M"]
    const chartRangeMap = {
        "1D": 1,
        "7D": 7,
        "1M": 30,
        "3M": 90
    }
    let [ loadedChartData, setLoadedChartData ] = useState( null )
    let [ selectedChartRange, setSelectedChartRange ] = useState( "7D" )

    function handleAddToWatchlist( coinId ) {
        fetcher.submit(
            { coinId }, 
            { 
                method: "post", 
                action: "/app/dashboard" 
            } 
        )
    }

    function handleRemoveFromWatchlist( coinId ) {
        fetcher.submit(
            { coinId },
            {
                method: "delete",
                action: "/app/dashboard"
            }
        )
    }

    function revalidateAssetDetails() {
        revalidator.revalidate()
    }

    function closeAssetDetails() {
        const windowPath = window.location.pathname
        const segments = windowPath.split("/").filter(Boolean)

        // remove /details/:symbol from the end of the path
        if ( segments.length > 2 && segments[segments.length - 2] === "details" ) {
            const newPath = "/" + segments.slice(0, -2).join("/")
            navigateTo( newPath )
        } else {
            navigateTo( "/" )
        }
    }

    async function handleChartRangeUpdate( range, symbol ) {
        if ( supportedChartRanges.includes( range ) ) {
            const accessToken = localStorage.getItem("greenfinance-token")
            const backendUrl = import.meta.env.VITE_BACKEND_URL

            const resp = await fetch(
                `${ backendUrl }/app/assets/${ symbol }/chart?days=${ chartRangeMap[ range ] }`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )

            if ( !resp.ok ) {
                let errorText = ""

                if ( resp.status === 401 ) {
                    errorText = "Session expired. Invalid authorization encountered"
                } else {
                    const { error } = await resp.json()

                    errorText = error.message
                }

                return showToast({
                    type: "error",
                    message: `There was an error fetching coin chart data. Error: ${ errorText }`
                })
            }

            const { data } = await resp.json()

            setLoadedChartData(data.prices.map( ( price ) => price.toFixed(2)))
            setSelectedChartRange( range )
        } else if ( range === "7D" ) {
            setLoadedChartData([])
        }
    }

    useEffect(() => {
        if ( status === "success" ) {
            if ( method === "POST" ) {
                showToast({
                    type: "success",
                    message: "Coin added to watchlist successfully!"
                })
            } else if ( method === "DELETE" ) {
                showToast({
                    type: "success",
                    message: "Coin removed from watchlist successfully!"
                })
            }
        } else if ( status === "error" ) {
            if ( method === "POST" ) {
                showToast({
                    type: "error",
                    message: error.message || "Failed to add coin to watchlist. Please try again later."
                })
            } else if ( method === "DELETE" ) {
                showToast({
                    type: "error",
                    message: error.message || "Failed to remove coin from watchlist. Please try again later."
                })
            }
        }

        revalidateAssetDetails()
    }, [ status, method ])

    return (
        <Dialog.Root 
            defaultOpen={true}
            onOpenChange={ closeAssetDetails }
        >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/75 z-1" />

                <Dialog.Content
                    className="
                        absolute
                        top-1/2
                        left-1/2
                        -translate-1/2
                        w-9/10
                        max-w-250
                        max-h-[85vh]
                        bg-white
                        rounded-xl
                        overflow-auto
                        z-1
                    "
                >                    
                    <Suspense fallback={
                        <div>
                            <VisuallyHidden.Root>
                                <Dialog.Title>
                                    loading coin details...
                                </Dialog.Title>

                                <Dialog.Description>
                                    Please wait while we fetch the latest details for this coin.
                                </Dialog.Description>
                            </VisuallyHidden.Root>


                            {/* dialog header */}
                            <div 
                                className="
                                    flex
                                    p-6
                                    pt-14
                                    gap-3 gap-y-5 lg:gap-5
                                    items-center
                                    border-b-2
                                    border-gray-300 
                                    flex-wrap
                                    justify-start
                                "
                            >
                                {/* image loading placeholder */}
                                <div
                                    className="
                                        w-15 lg:w-20
                                        h-15 lg:h-20
                                        skeleton
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                </div>

                                {/* asset name, price and % change loading placeholder */}
                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-2
                                    "
                                >
                                    <div
                                        className="
                                            skeleton
                                            w-32
                                            h-6
                                            rounded
                                        "
                                    ></div>

                                    <div
                                        className="
                                            skeleton
                                            w-32
                                            h-6
                                            rounded
                                        "
                                    ></div>
                                </div>

                                {/* dialog actions */}
                                <div
                                    className="
                                        md:ml-auto
                                        flex
                                        items-center
                                        gap-3
                                        *:w-12
                                        *:h-12
                                        *:rounded-full
                                    "
                                >
                                    <div
                                        className="
                                            skeleton
                                        "
                                    ></div>
                                    
                                    <div
                                        className="
                                            skeleton
                                        "
                                    ></div>
                                    
                                    <div
                                        className="
                                            skeleton
                                        "
                                    ></div>
                                </div>
                            </div>

                            {/* dialog content */}
                            <div
                                className="
                                    p-6
                                    grid
                                    grid-cols-1fr lg:grid-cols-[2fr_1fr]
                                "
                            >
                                {/* asset details and chart */}
                                <div
                                    className="
                                        lg:pr-8    
                                    "
                                >
                                    {/* asset chart area loading placeholder */}
                                    <div
                                        className="
                                            skeleton
                                            h-70
                                            rounded-xl
                                        "
                                    ></div>

                                    {/* asset details loading placeholder */}
                                    <div
                                        className="
                                            mt-4
                                            flex
                                            flex-col
                                            gap-2
                                        "
                                    >
                                        <div
                                            className="
                                                skeleton
                                                w-full
                                                h-6
                                                rounded
                                            "
                                        ></div>

                                        <div
                                            className="
                                                skeleton
                                                w-7/8
                                                h-6
                                                rounded
                                            "
                                        ></div>

                                        <div
                                            className="
                                                skeleton
                                                w-3/4
                                                h-6
                                                rounded
                                            "
                                        ></div>
                                        
                                        <div
                                            className="
                                                skeleton
                                                w-2/3
                                                h-6
                                                rounded
                                            "
                                        ></div>
                                    </div>
                                </div>

                                {/* portfolio details and alerts */}
                                <div
                                    className="
                                        mt-8 lg:mt-0
                                    "
                                >
                                    {/* portfolio details */}
                                    <div>
                                        <h2
                                            className="
                                                text-xl
                                                capitalize
                                            "
                                        > 
                                            your portfolio 
                                        </h2>

                                        {/* portfolio details loading placeholder */}
                                        <div
                                            className="
                                                mt-4
                                                flex
                                                flex-col
                                                gap-2
                                                *:w-2/3
                                                *:h-4
                                                *:rounded
                                            "
                                        >
                                            <div
                                                className="
                                                    skeleton
                                                "
                                            ></div>
                                            
                                            <div
                                                className="
                                                    skeleton
                                                "
                                            ></div>
                                            
                                            <div
                                                className="
                                                    skeleton
                                                "
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    {/* alerts for assets */}
                                    <div
                                        className="
                                            mt-6
                                        "
                                    >
                                        <h2
                                            className="
                                                capitalize
                                                text-xl
                                            "
                                        > 
                                            alerts 
                                        </h2>

                                        {/* alerts list */}
                                        <div
                                            className="
                                                mt-4
                                                flex
                                                flex-col
                                                gap-4.5
                                            "
                                        >
                                            {/* alert */}
                                            <div
                                                className="
                                                    flex
                                                    gap-2
                                                    items-center
                                                "
                                            >
                                                {/* alert image loading placeholder */}
                                                <div
                                                    className="
                                                        w-10
                                                        h-10
                                                        skeleton
                                                        rounded-full
                                                    "
                                                ></div>

                                                {/* alert content loading placeholder */}
                                                <div>
                                                    <div
                                                        className="
                                                            skeleton
                                                            w-24
                                                            h-4
                                                            rounded
                                                        "
                                                    ></div>
                                                    
                                                    <div
                                                        className="
                                                            skeleton
                                                            mt-1.5
                                                            w-24
                                                            h-4
                                                            rounded
                                                        "
                                                    ></div>
                                                </div>

                                                <div
                                                    className="
                                                        ml-auto
                                                        flex
                                                        gap-2
                                                        items-center
                                                        *:p-4
                                                        *:rounded-full
                                                    "
                                                >
                                                    <div
                                                        className="
                                                            skeleton
                                                        "
                                                    ></div>
                                                    
                                                    <div
                                                        className="
                                                            skeleton
                                                        "
                                                    ></div>
                                                </div>
                                            </div>
                                            
                                            <div
                                                className="
                                                    flex
                                                    gap-2
                                                    items-center
                                                "
                                            >
                                                {/* alert image loading placeholder */}
                                                <div
                                                    className="
                                                        w-10
                                                        h-10
                                                        skeleton
                                                        rounded-full
                                                    "
                                                ></div>

                                                {/* alert content loading placeholder */}
                                                <div>
                                                    <div
                                                        className="
                                                            skeleton
                                                            w-24
                                                            h-4
                                                            rounded
                                                        "
                                                    ></div>
                                                    
                                                    <div
                                                        className="
                                                            skeleton
                                                            mt-1.5
                                                            w-24
                                                            h-4
                                                            rounded
                                                        "
                                                    ></div>
                                                </div>

                                                <div
                                                    className="
                                                        ml-auto
                                                        flex
                                                        gap-2
                                                        items-center
                                                        *:p-4
                                                        *:rounded-full
                                                    "
                                                >
                                                    <div
                                                        className="
                                                            skeleton
                                                        "
                                                    ></div>
                                                    
                                                    <div
                                                        className="
                                                            skeleton
                                                        "
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }>
                        <Await 
                            resolve={ assetDetails }
                            errorElement={
                                <RouteError 
                                    title={"Error loading asset details"}
                                    message="There was an error loading the details for this cryptocurrency. Please try again later."
                                    handleRetry={() => {}}
                                />
                            }
                        >
                            { ( { data } ) => (
                                <>
                                    <div
                                        className="
                                            pb-16
                                        "
                                    >
                                        {/* dialog header */}
                                        <div 
                                            className="
                                                flex
                                                p-6
                                                pt-14
                                                gap-3 gap-y-5 lg:gap-5
                                                items-center
                                                border-b-2
                                                border-gray-300 
                                                flex-wrap
                                                justify-start
                                            "
                                        >
                                            {/* asset image */}
                                            <img 
                                                src={ data.image } 
                                                alt="Bitcoin" 
                                                className="
                                                    w-15 lg:w-20
                                                    h-15 lg:h-20
                                                    object-cover
                                                    rounded-full
                                                "
                                            />

                                            {/* asset name, price and % change */}
                                            <div>
                                                <Dialog.Title
                                                    className="
                                                        text-2xl
                                                    "
                                                >
                                                    { data.name }
                                                </Dialog.Title>

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                    "
                                                >
                                                    <span
                                                        className="
                                                            text-xl
                                                        "
                                                    >
                                                        {
                                                            formatAsCurrency(
                                                                data.price * conversionRate,
                                                                currentlyLoggedInUser.data.preferred_currency
                                                            )
                                                        }
                                                    </span>

                                                    <PercentChangeIndicator
                                                        percentChange={ data.percent_change_24h }
                                                        isThemed={false}
                                                    />
                                                </div>
                                            </div>

                                            {/* dialog actions */}
                                            <div
                                                className="
                                                    md:ml-auto
                                                    flex
                                                    items-center
                                                    gap-3
                                                    *:p-3
                                                    *:bg-green-700 *:hover:bg-green-900 
                                                    *:rounded-full
                                                    *:text-white
                                                    *:text-xl
                                                    *:focus:outline-none
                                                "
                                            >
                                                <Button
                                                    className="
                                                        p-4
                                                        flex
                                                        items-center
                                                        justify-center
                                                    "
                                                    onClick={ 
                                                        data.is_watchlist ?
                                                        () => handleRemoveFromWatchlist( data.id ) :
                                                        () => handleAddToWatchlist( data.id ) 
                                                    }
                                                >
                                                    { 
                                                        data.is_watchlist ? 
                                                        (
                                                            ( state === "loading" || state === "submitting" ) ? 
                                                            <FaSpinner className="animate-spin" /> : 
                                                            <FaTrash/> 
                                                        ) :
                                                        (
                                                            ( state === "loading" || state === "submitting" ) ? 
                                                            <FaSpinner className="animate-spin" /> : 
                                                            <FaStar/> 
                                                        )
                                                    }
                                                </Button>
                                            </div>
                                        </div>

                                        {/* dialog content */}
                                        <div
                                            className="
                                                p-6
                                            "
                                        >
                                            {/* asset details and chart */}
                                            <div
                                                className="
                                                    lg:pr-8
                                                "
                                            >
                                                {/* asset chart container */}
                                                <div
                                                    className="
                                                        flex
                                                        flex-col
                                                        items-center
                                                    "
                                                >
                                                    {/* chart */}
                                                    <div
                                                        className="
                                                            h-80 lg:h-50
                                                            rounded-xl
                                                            w-full
                                                        "
                                                    >
                                                        <CoinChart 
                                                            data={[
                                                                {
                                                                    name: data.name,
                                                                    data: loadedChartData || data.sparkline.map(
                                                                        ( price ) => price.toFixed(2)
                                                                    ),
                                                                }
                                                            ]}
                                                            isInteractive={true}
                                                        />
                                                    </div>

                                                    {/* chart toggle */}
                                                    <ToggleGroup.Root 
                                                        type="single" 
                                                        value={ selectedChartRange }
                                                        onValueChange={
                                                            ( value ) => handleChartRangeUpdate( value, data.id )
                                                        }
                                                        className="
                                                            flex
                                                            items-center
                                                            gap-4
                                                            flex-wrap
                                                            justify-center
                                                        "
                                                    >
                                                        { supportedChartRanges.map((value) => (
                                                            <ToggleGroup.Item
                                                                key={value}
                                                                value={value}
                                                                className="
                                                                    py-1 
                                                                    px-3 
                                                                    rounded-xl 
                                                                    text-sm
                                                                    bg-green-100
                                                                    data-[state=on]:bg-green-700
                                                                    data-[state=on]:text-white
                                                                "
                                                            >
                                                                {value}
                                                            </ToggleGroup.Item>
                                                        ))}
                                                    </ToggleGroup.Root>
                                                </div>

                                                {/* asset details */}
                                                <p
                                                    className="
                                                        mt-6
                                                    "
                                                >
                                                    { data.description }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </Await>
                    </Suspense>

                    <Dialog.Close
                        className="
                            bg-gray-700 hover:bg-gray-900
                            text-white
                            text-xl
                            fixed
                            right-3
                            top-3
                            p-2
                            rounded-full
                        "
                    >
                        <FaXmark/>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
