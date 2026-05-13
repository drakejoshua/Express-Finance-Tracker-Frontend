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
    const fetcher = useFetcher()
    const { status, error } = fetcher.data || {}

    const { showToast } = useToastProvider()

    const revalidator = useRevalidator();
    const [ isDeleting, setIsDeleting ] = useState( false )

    function handleDeleteFromWatchlist( coinId ) {
        setIsDeleting( true )

        fetcher.submit(
            { coinId },
            { 
                method: "DELETE",
                action: "/app/dashboard" 
            }
        )
    }

    function revalidateAssetDetails() {
        revalidator.revalidate()
    }

    useEffect( function() {
        if (status === "success") {
            showToast({
                type: "success",
                message: "Coin removed from watchlist successfully!"
            })

            revalidateAssetDetails()
        } else if ( status === "error" ) {
            showToast({
                type: "error",
                message: error.message || "Failed to remove coin from watchlist. Please try again later."
            })
        }

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
