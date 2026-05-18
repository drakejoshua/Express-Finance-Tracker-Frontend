/* 
    getWatchlistDataLoader.jsx

    This is a data loader function for fetching the user's 
    watchlist data from the backend API. It handles authentication 
    by including the access token in the request headers, and it also 
    implements a mechanism to refresh the token if a 401 Unauthorized 
    response is received. The loader returns the watchlist data and any 
    new user data if the token was refreshed successfully.
*/



// import the refreshOn401 function from the AuthProvider to 
// handle token refresh logic
import { refreshOn401 } from "../../../shared/providers/AuthProvider.jsx"

// get the backend URL from environment variables
const backendUrl = import.meta.env.VITE_BACKEND_URL


// getWatchlistData()
// This function fetches the user's watchlist data from the backend API. 
// It includes the access token in the request headers for authentication. 
// If a 401 Unauthorized response is received, it attempts to refresh the 
// token and retry the request. The function returns the watchlist data 
// and any new user data if the token was refreshed successfully.
async function getWatchlistData({ request }) {
    // retrieve the access token from local storage
    const accessToken = localStorage.getItem("greenfinance-token")

    // get the limit parameter from the request URL, defaulting to 
    // 10 if not provided
    const limit = new URL(request.url).searchParams.get("limit") || 10

    // make a fetch request to the backend API to get the watchlist data,
    // including the access token in the Authorization header
    let response = await fetch(
        `${ backendUrl }/app/watchlist?limit=${ limit }`,
        {
            headers: {
                "Authorization": `Bearer ${ accessToken }`
            }
        }
    )

    // if the response is not ok, check if it's a 401 Unauthorized error
    // and attempt to refresh the token if it is. If the token refresh is successful,
    // retry the original request with the new token. If any step fails, log the error
    // and throw an appropriate error message.
    if ( !response.ok ) {
        if ( response.status === 401 ) {
            // if 401 unauthorized error, send request to refresh token to the
            // backend
            const { status, data, error } = await refreshOn401()

            // check status of the refresh request if it's successful, and if so, 
            // retry the original request to fetch the watchlist data with the new 
            // access token. If any step fails, log the error and throw an 
            // appropriate error message.
            if ( status === "success" ) {
                // if successful, retry the GET request to fetch the watchlist data 
                // with the new access token
                response = await fetch(
                    `${ backendUrl }/app/watchlist?limit=${ limit }`,
                    {
                        headers: {
                            "Authorization": `Bearer ${ data.accessToken }`
                        }
                    }
                )

                // check if GET watchlist request is successful
                if ( response.ok ) {
                    // if watchlist request is successful, extract the JSON from
                    // the request body and return the watchlist data along with 
                    // any new user data from the token refresh
                    const { data: retryData } = await response.json()

                    return {
                        data: retryData,
                        newUserData: data
                    }
                } else {
                    // if the retry request fails, throw an error with the message 
                    // from the response
                    throw new Error("Failed to fetch watchlist data after token refresh.")
                }
            } else {
                // if the token refresh fails, throw an error with the message 
                // from the refresh response or a default message
                throw new Error(
                    error.message ||
                    "Failed to refresh token while fetching watchlist data."
                )
            }
        } else {
            // if the error is not a 401, extract the error message from the response and
            // throw an error with that message or a default message
            const { error } = await response.json()

            console.log("Failed to fetch watchlist data: ", error.message)
            throw new Error( error.message || "Failed to fetch watchlist data.")
        }
    }


    // if the initial request is successful, extract the JSON from the 
    // response body and return the watchlist data
    const { data } = await response.json()

    return { data }
}


// getWatchlistDataLoader()
// This is the main data loader function that will be used in the 
// watchlist route. It calls the getWatchlistData function to fetch 
// the watchlist data as a promise and returns it in an object that 
// can be accessed in the watchlist component. The loader handles 
// the asynchronous data fetching and ensures that the watchlist 
// data is available when the component is rendered.
export function getWatchlistDataLoader({ request }) {
    return {
        watchlistData: getWatchlistData({ request })
    }
}