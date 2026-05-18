/* 
    WatchlistCard.jsx

    This component represents a single coin in the user's watchlist. 
    It displays the coin's image, name, current price, percentage 
    price change, and a sparkline chart showing the coin's price 
    movement over the last 7 days. The card also includes a delete 
    button that allows the user to remove the coin from their watchlist. 
    When the delete button is clicked, a request is sent to the server 
    to update the user's watchlist, and the UI is updated accordingly 
    based on the response.
*/


// import required dependencies and components
import { FaPen, FaSpinner, FaTrash } from "react-icons/fa6";
import Button from "../../../shared/components/Button";
import PercentChangeIndicator from "../../../shared/components/PercentChangeIndicator";
import ThemedCoinChart from "../../../shared/components/ThemedCoinChart";
import { Link, useFetcher, useRevalidator } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToastProvider } from "../../../shared/providers/ToastProvider";



export default function WatchlistCard({
    id,
    imageSrc,
    name,
    price,
    percentChange,
    sparklineData,
}) {
    // fetcher for sending delete request to remove coin from 
    // watchlist and revalidator for revalidating asset details 
    // data after successful deletion
    const fetcher = useFetcher()
    const { status, error } = fetcher.data || {}

    // toast provider for showing success or error messages 
    // after deleting coin from watchlist
    const { showToast } = useToastProvider()

    // revalidator for revalidating asset details data after 
    // successful deletion of coin from watchlist to update 
    // the UI with latest data
    const revalidator = useRevalidator();

    // state for tracking whether delete request is in progress 
    // to show loading spinner on delete button
    const [ isDeleting, setIsDeleting ] = useState( false )

    // handleDeleteFromWatchlist()
    // This function is called when the user clicks the delete 
    // button on the watchlist card. It sends a DELETE request to 
    // the server with the coin ID to remove it from the user's watchlist.
    // The function also updates the isDeleting state to show a loading 
    // spinner on the delete button while the request is in progress.
    function handleDeleteFromWatchlist( coinId ) {
        // set isDeleting to true to show loading spinner 
        // on delete button
        setIsDeleting( true )

        // send DELETE request to server to remove coin 
        // from watchlist
        fetcher.submit(
            { coinId },
            { 
                method: "DELETE",
                action: "/app/dashboard" 
            }
        )
    }

    // This effect runs whenever the status of the delete request changes.
    // it revalidates the asset details data to update the UI with the 
    // latest data after successful deletion of coin from watchlist. 
    function revalidateAssetDetails() {
        revalidator.revalidate()
    }


    // useEffect for showing success or error toast messages based on the 
    // response of the delete request and revalidating asset details data 
    // after successful deletion to update the UI with latest data. It also 
    // resets the isDeleting state to false after the request is completed.
    useEffect( function() {
        if (status === "success") {
            // show success toast message after successful deletion of coin 
            // from watchlist
            showToast({
                type: "success",
                message: "Coin removed from watchlist successfully!"
            })

            // revalidate asset details data to update the UI with latest 
            // data after successful deletion of coin from watchlist
            revalidateAssetDetails()
        } else if ( status === "error" ) {
            // show error toast message if there was an error deleting the 
            // coin from watchlist
            showToast({
                type: "error",
                message: error.message || "Failed to remove coin from watchlist. Please try again later."
            })
        }

        // reset isDeleting to false after request is completed to hide
        // loading spinner on delete button
        setIsDeleting( false )
    }, [ status ])

    return (
        <div
            className="
                bg-gray-100 dark:bg-gray-700 
                p-6
                rounded-lg
            "
        >
            {/* coin image and name */}
            <div
                className="
                    flex
                    gap-2
                "
            >
                {/* coin image */}
                <img
                    src={imageSrc}
                    alt={name}
                    className="
                        w-6
                        h-6
                        object-cover
                        rounded-full
                    "
                />

                {/* coin name */}
                <Link
                    className="
                        capitalize
                        dark:text-white
                    "
                    to={`details/${id}`}
                >
                    {name}
                </Link>
            </div>

            {/* coin portfolio balance, % balance change, current price */}
            {/* and portfolio controls */}
            <div
                className="
                    flex
                    mt-2
                "
            >
                <div
                    className="
                        flex
                        flex-col
                        gap-1
                        min-w-0
                    "
                >
                    {/* coin current price */}
                    <Link
                        className="
                            text-4xl
                            font-medium
                            text-gray-800
                            dark:text-white
                            overflow-hidden
                            text-ellipsis
                            whitespace-nowrap
                        "
                        title={price}
                        to={`details/${id}`}
                    >
                        {price}
                    </Link>

                    {/* coin % price change */}
                    <PercentChangeIndicator
                        percentChange={percentChange}
                        className="
                            text-lg
                        "
                    />
                </div>

                <div
                    className="
                        ml-auto
                        flex
                        items-center
                        gap-2
                    "
                >
                    {/* delete button */}
                    <Button
                        className="
                            p-3
                            rounded-full
                            text-xl
                        "
                        onClick={() => handleDeleteFromWatchlist(id)}
                    >
                        {
                            isDeleting ?
                            <FaSpinner className="animate-spin" /> :
                            <FaTrash />
                        }
                    </Button>
                </div>
            </div>

            {/* coin sparkline chart */}
            <div
                className="
                    h-40
                    w-[104%]
                    relative
                    -left-4
                "
            >
                <ThemedCoinChart data={sparklineData} />
            </div>
        </div>
    );
}
