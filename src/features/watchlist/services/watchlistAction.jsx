import { refreshOn401 } from "../../../shared/providers/AuthProvider";

const backendUrl = import.meta.env.VITE_BACKEND_URL

async function addToWatchlist( coinId ) {
    const accessToken = localStorage.getItem("greenfinance-token")

    try {
        const response = await fetch( `${backendUrl}/app/watchlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ symbol: coinId }),
        })

        if ( !response.ok ) {
            if ( response.status === 401 ) {
                const { status, data } = await refreshOn401()

                if ( status === "success" ) {
                    const newAccessToken = data.user.accessToken

                    // retry the original request with the new access token
                    const retryResponse = await fetch( `${backendUrl}/app/watchlist`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${newAccessToken}`
                        },
                        body: JSON.stringify({ symbol: coinId }),
                    })

                    if ( !retryResponse.ok ) {
                        return {
                            status: "error",
                            error: {
                                message: "Session expired. Please log in again."
                            }
                        }
                    } else {
                        const { data: retryData } = await retryResponse.json()

                        return {
                            status: "success",
                            data: retryData,
                            newUserData: data.user
                        }
                    }
                } else {
                    return {
                        status: "error",
                        error: {
                            message: "Session expired. Please log in again."
                        }
                    }
                }
            } else {
                const { error } = await response.json()

                return {
                    status: "error",
                    error
                }
            }
        }

        const data = await response.json()

        return {
            status: "success",
            data: data
        }
    } catch {
        return {
            status: "error",
            error: {
                message: "Failed to add coin to watchlist. Please try again later."
            }
        }
    }
}

async function removeFromWatchlist( coinId ) {
    const accessToken = localStorage.getItem("greenfinance-token")

    try {
        const response = await fetch( `${backendUrl}/app/watchlist/${coinId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })

        if ( !response.ok ) {
            if ( response.status === 401 ) {
                const { status, data } = await refreshOn401()

                if ( status === "success" ) {
                    const newAccessToken = data.user.accessToken

                    // retry the original request with the new access token
                    const retryResponse = await fetch( `${backendUrl}/app/watchlist/${coinId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${newAccessToken}`
                        }
                    })

                    if ( !retryResponse.ok ) {
                        return {
                            status: "error",
                            error: {
                                message: "Session expired. Please log in again."
                            }
                        }
                    } else {
                        const { data: retryData } = await retryResponse.json()

                        return {
                            status: "success",
                            data: retryData,
                            newUserData: data.user
                        }
                    }
                } else {
                    return {
                        status: "error",
                        error: {
                            message: "Session expired. Please log in again."
                        }
                    }
                }
            } else {
                const { error } = await response.json()

                return {
                    status: "error",
                    error
                }
            }
        }

        const data = await response.json()

        return {
            status: "success",
            data: data
        }
    } catch {
        return {
            status: "error",
            error: {
                message: "Failed to remove coin from watchlist. Please try again later."
            }
        }
    }
}

export async function watchlistAction({ request }) {
    const formData = await request.formData()
    const method = request.method

    switch ( method ) {
        case "POST": {
            const coinId = formData.get("coinId")

            const result = await addToWatchlist( coinId )
            
            return {
                ...result,
                method: "POST"
            }
        }
        case "DELETE": {
            const coinId = formData.get("coinId")

            const result = await removeFromWatchlist( coinId )

            return {
                ...result,
                method: "DELETE"
            }
        }
    }
}