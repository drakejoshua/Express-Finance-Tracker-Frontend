// import required dependencies
import { refreshOn401 } from "../../../shared/providers/AuthProvider.jsx"


// get the backend URL from environment variables to use 
// in the portfolio summary request
const backendUrl = import.meta.env.VITE_BACKEND_URL

export async function getPortfolioSummary() {
    // get the current access token from local storage to include in the
    // Authorization header of the portfolio summary request
    const accessToken = localStorage.getItem( "greenfinance-token" )

    // make a GET request to the backend portfolio summary endpoint
    const response = await fetch( 
        `${ backendUrl }/app/portfolio?limit=1`,
        {
            headers: {
                "Authorization": `Bearer ${ accessToken }`
            }
        }
    )

    // if the response is not ok, check if it's a 401 error
    // to attempt token refresh, otherwise return an error message to the user
    if ( !response.ok ) {
        // if the response status is 401, attempt to refresh the access
        // token and retry the portfolio summary request with the new token
        if ( response.status === 401 ) {
            // if the response status is 401, attempt to refresh the 
            // access token
            const { status, data } = await refreshOn401()

            if ( status === "success" ) {
                // if the token refresh was successful, retry the 
                // original portfolio summary request with the new access token
                const newAccessToken = data.user.accessToken

                // retry the original portfolio summary request with the new access token
                const retryResponse = await fetch( 
                    `${ backendUrl }/app/portfolio?limit=1`,
                    {
                        headers: {
                            "Authorization": `Bearer ${ newAccessToken }`
                        }
                    }
                )

                // if the retry response is ok, return the portfolio summary data, otherwise return an error
                if ( retryResponse.ok ) {
                    const { data: retryData } = await retryResponse.json()

                    return { 
                        data: retryData,
                        newUserData: data.user
                    }
                } else {
                    console.log( "Failed to fetch portfolio summary after token refresh:", retryResponse.statusText,  retryResponse.status )
                    throw new Error("Failed to load portfolio summary after token refresh")
                }
            } else {
                throw new Error("Failed to refresh access token on fetching portfolio summary")
            }
        } else {
            throw new Error("Failed to fetch portfolio summary. Please try again later")
        }
    } else {
        const { data } = await response.json()

        return {
            data
        }
    }
}


export function getPortfolioSummaryLoader() {
    // use defer to return a promise for the portfolio summary 
    // data to allow the dashboard component to render immediately 
    // and show a loading UI and also reject with errors 
    return {
        portfolioSummary: getPortfolioSummary()
    }
}