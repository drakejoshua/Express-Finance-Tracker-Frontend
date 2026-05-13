import { refreshOn401 } from "../../../shared/providers/AuthProvider.jsx"

const backendUrl = import.meta.env.VITE_BACKEND_URL

async function getWatchlistData({ request }) {
    const accessToken = localStorage.getItem("greenfinance-token")
    const limit = new URL(request.url).searchParams.get("limit") || 10

    let response = await fetch(
        `${ backendUrl }/app/watchlist?limit=${ limit }`,
        {
            headers: {
                "Authorization": `Bearer ${ accessToken }`
            }
        }
    )

    if ( !response.ok ) {
        if ( response.status === 401 ) {
            const { status, data, error } = await refreshOn401()

            if ( status === "success" ) {
                response = await fetch(
                    `${ backendUrl }/app/watchlist?limit=${ limit }`,
                    {
                        headers: {
                            "Authorization": `Bearer ${ data.accessToken }`
                        }
                    }
                )

                if ( response.ok ) {
                    const { data: retryData } = await response.json()

                    return {
                        data: retryData,
                        newUserData: data
                    }
                } else {
                    console.log("Failed to fetch watchlist data after token refresh: ", response.status, response.statusText)
                    throw new Error("Failed to fetch watchlist data after token refresh.")
                }
            } else {
                console.log("Failed to refresh token while fetching watchlist data: ", error.message)
                throw new Error(
                    error.message ||
                    "Failed to refresh token while fetching watchlist data."
                )
            }
        } else {
            const { error } = await response.json()

            console.log("Failed to fetch watchlist data: ", error.message)
            throw new Error( error.message || "Failed to fetch watchlist data.")
        }
    }

    const { data } = await response.json()

    return { data }
}


export function getWatchlistDataLoader({ request }) {
    return {
        watchlistData: getWatchlistData({ request })
    }
}