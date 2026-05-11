import { refreshOn401 } from "../providers/AuthProvider.jsx"

const backendUrl = import.meta.env.VITE_BACKEND_URL

async function getCoinDetails({ params }) {
    const { symbol } = params

    const accessToken = localStorage.getItem("greenfinance-token")

    const response = await fetch(
        `${ backendUrl }/app/assets/${ symbol }`,
        {
            headers: {
                "Authorization": `Bearer ${ accessToken }`
            }
        }
    )

    if ( !response.ok ) {
        if ( response.status === 401 ) {
            const { status, data } = await refreshOn401()

            if ( status === "success" ) {
                const newAccessToken = data.user.accessToken

                const retryResponse = await fetch(
                    `${ backendUrl }/app/assets/${ symbol }`,
                    {
                        headers: {
                            "Authorization": `Bearer ${ newAccessToken }`
                        }
                    }
                )

                if ( retryResponse.ok ) {
                    const retryData = await retryResponse.json()

                    return { 
                        data: retryData.data,
                        newUserData: data.user
                    }
                } else {
                    console.log( "Failed to fetch coin details after token refresh:", retryResponse.statusText,  retryResponse.status )
                    throw new Error("Failed to load coin details after token refresh")
                }
            } else {
                console.log( "Failed to refresh access token on fetching coin details:", data )
                throw new Error("Failed to refresh access token on fetching coin details")
            }
        } else {
            console.log( "Failed to fetch coin details:", response.statusText,  response.status )
            throw new Error("Failed to load coin details. Please try again later")
        }
    }

    const { data } = await response.json()
    return { data }
}


export function getCoinDetailsLoader( args ) {
    return {
        assetDetails: getCoinDetails( args )
    }
}