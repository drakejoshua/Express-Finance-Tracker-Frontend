/* 
    AssetDetails.jsx

    This page renders the details for a specific cryptocurrency asset, including its price,
    description, and a price chart. The page is implemented as a dialog that opens when a user
    clicks on an asset from the search results or their watchlist. The component uses the
    useLoaderData hook from react-router-dom to access the asset details data that is loaded
    by the getCoinDetailsLoader function. The page also includes functionality to add or remove
    the asset from the user's watchlist, and to update the price chart based on different time
    ranges. The component handles loading and error states gracefully, displaying appropriate
    messages and allowing the user to retry loading the data if an error occurs.
*/


// import necessary dependencies and components
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
import Button from "../components/Button"
import { useLoaderData, useNavigate, Await, useFetcher, useRevalidator } from "react-router-dom"
import AltButton from "../components/AltButton"
import AlertItem from "../components/AlertItem"
import RouteError from "../components/RouteError"
import CoinChart from "../components/CoinChart"
import { Suspense, useState } from "react"
import { formatAsCurrency } from "../utils/formatAsCurrency"
import { useAuthProvider } from "../providers/AuthProvider.jsx"
import { useAppData } from "../layouts/AppLayout"
import PercentChangeIndicator from "../components/PercentChangeIndicator"
import { DialogComponent, useDialogProvider } from "../providers/DialogProvider.jsx"
import TextField from "../components/TextField.jsx"
import { useToastProvider } from "../providers/ToastProvider.jsx"
import { useEffect } from "react"


export default function AssetDetails() {
    // get the navigate function from the useNavigate hook to 
    // programmatically navigate the user when they close the 
    // asset details dialog
    const navigateTo = useNavigate()

    // get the asset details data from the loader using the 
    // useLoaderData hook
    const { assetDetails } = useLoaderData()

    // initialize the fetcher to handle adding/removing the asset from the
    // user's watchlist
    const fetcher = useFetcher()
    const state = fetcher.state
    const { status, error, method } = fetcher.data || {}

    // initialize the revalidator to allow revalidating the loader data after
    // adding/removing the asset from the watchlist
    const revalidator = useRevalidator();

    // get the current user data for preferred currency and 
    // processCurrentUserChange function from the auth provider to 
    // handle updating the user data in the app after adding/removing 
    // the asset from the watchlist.
    const { 
        currentlyLoggedInUser, 
        processCurrentUserChange
    } = useAuthProvider()

    // get the conversion rate from the app data context for converting
    // asset prices in the user's preferred currency
    const { conversionRate } = useAppData()

    // get the showToast function from the toast provider to display 
    // success/error messages and the openDialog and closeDialog functions 
    // from the dialog provider to handle confirming the user's action when 
    // removing an asset from the watchlist.
    const { showToast } = useToastProvider()
    const { openDialog, closeDialog } = useDialogProvider()

    // chart update state and handlers
    const supportedChartRanges = ["1D","7D","1M","3M"]
    const chartRangeMap = {
        "1D": 1,
        "7D": 7,
        "1M": 30,
        "3M": 90
    }
    let [ loadedChartData, setLoadedChartData ] = useState( null )
    let [ selectedChartRange, setSelectedChartRange ] = useState( "7D" )
    let [ isUpdatingChart, setIsUpdatingChart ] = useState( false )

    // handleAddToWatchlist()
    // This function is called when the user clicks the button to add 
    // the asset to their watchlist. It submits a POST request using 
    // the fetcher to the appropriate action URL with the coin ID as 
    // form data.
    function handleAddToWatchlist( coinId ) {
        fetcher.submit(
            { coinId }, 
            { 
                method: "post", 
                action: "/app/dashboard" 
            } 
        )
    }

    // handleRemoveFromWatchlist()
    // This function is called when the user confirms that they want to 
    // remove the asset from their watchlist. It submits a DELETE request 
    // using the fetcher to the appropriate action URL with the coin ID as 
    // form data.
    function handleRemoveFromWatchlist( coinId ) {
        fetcher.submit(
            { coinId },
            {
                method: "delete",
                action: "/app/dashboard"
            }
        )
    }

    // function to revalidate the loader data after adding/removing 
    // the asset from the watchlist,
    function revalidateAssetDetails() {
        revalidator.revalidate()
    }

    // closeAssetDetails()
    // This function is called when the user closes the asset details dialog. 
    // It checks the current window location to determine the appropriate path
    // to navigate to after closing the dialog. If the current path includes
    // the asset details route (e.g. /assets/:symbol/details), it removes the 
    // /details/:symbol segment from the path to navigate back to the previous 
    // page (e.g. /assets or /dashboard). If the current path does not include 
    // the asset details route, it simply navigates to the home page ("/").
    function closeAssetDetails() {
        // get the current window path and split it into segments to analyze the 
        // structure of the path
        const windowPath = window.location.pathname
        const segments = windowPath.split("/").filter(Boolean)

        // remove /details/:symbol from the end of the path, then navigate to the
        // resulting path. If the path does not include /details/:symbol, 
        // navigate to the home page ("/")
        if ( segments.length > 2 && segments[segments.length - 2] === "details" ) {
            const newPath = "/" + segments.slice(0, -2).join("/")
            navigateTo( newPath )
        } else {
            navigateTo( "/" )
        }
    }

    // handleChartRangeUpdate()
    // This function is called when the user selects a different time range for the
    // price chart. It checks if the selected range is supported, and if so, it
    // makes a fetch request to the backend API to get the chart data for the selected
    // range. The function also handles token expiration by attempting to refresh the
    // access token if a 401 Unauthorized response is received, and then retrying the
    // request with the new token. If the request is successful, it updates the chart data
    // state to display the new chart data for the selected range.
    async function handleChartRangeUpdate( range, symbol ) {
        // check if the selected range is supported before making 
        // the fetch request to get the chart data for the selected range. 
        // If the range is not supported, do nothing.
        if ( supportedChartRanges.includes( range ) ) {
            // retrieve the access token from local storage
            const accessToken = localStorage.getItem("greenfinance-token")

            // get the backend URL from environment variables
            const backendUrl = import.meta.env.VITE_BACKEND_URL

            // set the chart updating state to true to display a loading 
            // indicator while the chart data is being fetched
            setIsUpdatingChart( true )

            // make a fetch request to the backend API to get the chart data 
            // for the selected range, including the access token in the Authorization 
            // header for authentication.
            const resp = await fetch(
                `${ backendUrl }/app/assets/${ symbol }/chart?days=${ chartRangeMap[ range ] }`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )

            // if the response is not ok, check if it's a 401 Unauthorized 
            // error and attempt to refresh the token if it is, else, log the 
            // error and show a toast message with an appropriate error message. 
            // If the token refresh is successful, retry the request with the new 
            // token and update the chart data state if the retry is successful. 
            // If any step fails, log the error and show a toast message with an 
            // appropriate error message.
            if ( !resp.ok ) {
                let errorText = ""

                if ( resp.status === 401 ) {
                    // if 401 unauthorized error, create appropriate error message 
                    // explaining that the user's session has expired and they need to log in again.
                    errorText = "Session expired. Invalid authorization encountered"
                } else {
                    // for any other type of error, create appropriate error message 
                    // with the status text and status code from the response
                    const { error } = await resp.json()

                    errorText = error.message
                }

                // show a toast message with the appropriate error message to inform 
                // the user about the error that occurred while fetching the chart data
                return showToast({
                    type: "error",
                    message: `There was an error fetching coin chart data. Error: ${ errorText }`
                })
            }

            // if the response is successful, extract the JSON from the response body
            const { data } = await resp.json()

            // update the chart data state with the new chart data for the selected range
            // and set the selected chart range state to the newly selected range. 
            // Finally, set the chart updating state to false to hide the loading indicator 
            // and display the updated chart.
            setLoadedChartData(data.prices.map( ( price ) => price.toFixed(2)))
            setSelectedChartRange( range )
            setIsUpdatingChart( false )
        } else if ( range === "7D" ) {
            // if the selected range is not supported and it's the default range 
            // (7D), reset the chart data to the original sparkline data from the 
            // asset details to display the default chart. Also, set the selected 
            // chart range state back to "7D" and set the chart updating state to 
            // false to hide any loading indicator.
            setLoadedChartData([])
        }
    }

    // confirmRemoveFromWatchlist()
    // This function is called when the user clicks the button to remove the asset 
    // from their watchlist. It opens a confirmation dialog using the openDialog 
    // function from the dialog provider, asking the user to confirm that they want 
    // to remove the asset from their watchlist.
    function confirmRemoveFromWatchlist( coinId ) {
        // open a confirmation dialog asking the user to confirm that they want to 
        // remove the asset from their watchlist
        const dialogId = openDialog({
            title: "Remove from Watchlist",
            description: "Are you sure you want to remove this coin from your watchlist?",
            content: (
                <div 
                    className="
                        mt-6
                        flex
                        gap-3
                        items-center
                        *:grow
                    "
                >
                    {/* cancel button - close dialog */}
                    <AltButton
                        onClick={ () => {
                            closeDialog( dialogId )
                        } }
                    >
                        Cancel
                    </AltButton>

                    {/* confirm button - call handleRemoveFromWatchlist */}
                    <Button
                        onClick={ () => {
                            closeDialog( dialogId )
                            handleRemoveFromWatchlist( coinId )
                        } }
                    >
                        Yes, Remove
                    </Button>
                </div>
            )
        })
    }

    // useEffect to show success/error toast messages based on the 
    // status of the add/remove watchlist action, and to revalidate the 
    // asset details data after the action is completed to reflect any 
    // changes in the UI. The effect runs whenever the status or method 
    // of the fetcher changes, allowing it to respond to the completion 
    // of the add/remove action and update the UI accordingly.
    useEffect(() => {
        if ( status === "success" ) {
            // show success toast message if the add/remove action was successful
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

            // revalidate the asset details data to reflect any changes in the 
            // UI after the add/remove action is successful
            revalidateAssetDetails()
        } else if ( status === "error" ) {
            // show error toast message if there was an error with the add/remove action
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
    }, [ status, method ])

    return (
        <Dialog.Root 
            defaultOpen={true}
            onOpenChange={ closeAssetDetails }
        >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/75 z-1" />

                {/* dialog content */}
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
                    onPointerDownOutside={(e) => e.preventDefault()}
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <Suspense fallback={
                        // fallback UI to display while the asset details data is being loaded
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
                                        ml-auto
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
                                </div>
                            </div>

                            {/* dialog content */}
                            <div
                                className="
                                    p-6
                                "
                            >
                                {/* asset details and chart */}
                                <div>
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
                            </div>
                        </div>
                    }>
                        <Await 
                            resolve={ assetDetails }
                            errorElement={
                                // error element to display if there is an error loading the 
                                // asset details data
                                <RouteError 
                                    title={"Error loading asset details"}
                                    message="There was an error loading the details for this cryptocurrency. Please try again later."
                                    handleRetry={ closeAssetDetails }
                                />
                            }
                        >
                            { function({ data, newUserData }) {
                                // if new user data is returned from the loader (after adding/removing from watchlist),
                                // process the user data change to update the user data in the app with the changes to the 
                                // watchlist, which will update the UI accordingly in other parts of the app that depend on 
                                // the user data, such as the dashboard and watchlist pages.
                                if ( newUserData ) {
                                    processCurrentUserChange( newUserData )
                                }

                                return (
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

                                            
                                            <div>
                                                {/* asset name */}
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
                                                    {/* asset price */}
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

                                                    {/* percent % change indicator */}
                                                    <PercentChangeIndicator
                                                        percentChange={ data.percent_change_24h }
                                                        isThemed={false}
                                                    />
                                                </div>
                                            </div>

                                            {/* dialog actions */}
                                            <div
                                                className="
                                                    ml-auto
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
                                                        () => confirmRemoveFromWatchlist( data.id ) :
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
                                            <div>
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

                                                    {/* chart update indicator */}
                                                    { isUpdatingChart && (
                                                        <div className="text-center">
                                                            <p>Updating chart...</p>
                                                        </div>
                                                    ) }

                                                    {/* chart range toggle */}
                                                    { !isUpdatingChart && <ToggleGroup.Root 
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
                                                    </ToggleGroup.Root>}
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
                                )
                            }}
                        </Await>
                    </Suspense>

                    {/* dialog close button */}
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
