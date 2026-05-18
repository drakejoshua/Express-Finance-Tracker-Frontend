/* 
    getCoinDetailsLoader.jsx

    This is a loader function used for the asset details page. It fetches the 
    details of a specific coin from the backend API using the coin symbol 
    from the route parameters. The loader also handles token expiration by 
    attempting to refresh the access token if a 401 Unauthorized response is 
    received, and then retrying the request with the new token.
*/


// import the refreshOn401 function from the AuthProvider to handle 
// token refresh logic
import { refreshOn401 } from "../providers/AuthProvider.jsx"

// get the backend URL from environment variables
const backendUrl = import.meta.env.VITE_BACKEND_URL


// getCoinDetails()
// This function fetches the details of a specific coin from the backend API using the
// coin symbol from the route parameters. It includes the access token in the request
// headers for authentication. If a 401 Unauthorized response is received, it attempts to
// refresh the token and retry the request with the new token. The function returns the
// coin details data and any new user data if the token was refreshed successfully.
async function getCoinDetails({ params }) {
    // extract the coin symbol from the route parameters
    const { symbol } = params

    // retrieve the access token from local storage
    const accessToken = localStorage.getItem("greenfinance-token")

    // make a fetch request to the backend API to get the coin details, 
    // including the access token in the Authorization header
    const response = await fetch(
        `${ backendUrl }/app/assets/${ symbol }`,
        {
            headers: {
                "Authorization": `Bearer ${ accessToken }`
            }
        }
    )

    // if the response is not ok, check if it's a 401 Unauthorized error 
    // and attempt to refresh the token if it is, else, throw an appropriate error message. 
    // If the token refresh is successful, retry the original request with the new 
    // token and return the coin details data and any new user data if the retry 
    // is successful. If any step fails, log the error and throw an appropriate error message.
    if ( !response.ok ) {
        if ( response.status === 401 ) {
            // if 401 unauthorized error, send request to refresh token to the backend
            const { status, data } = await refreshOn401()

            // check status of the refresh request if it's successful, and 
            // if so, retry the original request to fetch the coin details with 
            // the new access token. If any step fails, log the error and throw an 
            // appropriate error message.
            if ( status === "success" ) {
                // if successful, retry the GET request to fetch the coin 
                // details with the new access token
                const newAccessToken = data.user.accessToken

                // retry the original request with the new access token
                const retryResponse = await fetch(
                    `${ backendUrl }/app/assets/${ symbol }`,
                    {
                        headers: {
                            "Authorization": `Bearer ${ newAccessToken }`
                        }
                    }
                )

                // check if the retry request is successful, and if so, 
                // return the coin details data and any new user data.
                if ( retryResponse.ok ) {
                    const retryData = await retryResponse.json()

                    return { 
                        data: retryData.data,
                        newUserData: data.user
                    }
                } else {
                    // if the retry request fails, log the error and throw an 
                    // appropriate error message 
                    throw new Error("Failed to load coin details after token refresh")
                }
            } else {
                // if the token refresh fails, log the error and throw an appropriate 
                // error message
                throw new Error("Failed to refresh access token on fetching coin details")
            }
        } else {
            // if the response is not ok and it's not a 401 error, 
            // throw an error with an appropriate message
            throw new Error("Failed to load coin details. Please try again later")
        }
    }

    // if the response is successful, extract the JSON from the 
    // response body and return the coin details data
    const { data } = await response.json()
    return { data }
}


// getCoinDetailsLoader()
// This is the loader function that will be used in the route configuration for the 
// asset details page. It calls the getCoinDetails function to fetch the coin details 
// data and returns it in an object that can be accessed by the component using the 
// useLoaderData hook from react-router-dom.
export function getCoinDetailsLoader( args ) {
    return {
        assetDetails: getCoinDetails( args )
    }
}