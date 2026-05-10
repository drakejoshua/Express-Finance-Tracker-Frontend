// searchCoinsAction.jsx

// this action is responsible for handling search requests from the 
// AppSearchView component, making a request to the backend search 
// endpoint with the search query, and returning the search results 
// to the invoking route to update the search results state and display 
// the results to the user. It also handles refreshing the access token 
// if a 401 response is received from the backend and retrying the search 
// request with the new token, as well as returning any new user data with
// a refreshed access token to update the user's session in the 
// AuthProvider context through the invoking route.


// import necessary dependencies and utilities
import { refreshOn401 } from "../providers/AuthProvider.jsx"

// get the backend URL from environment variables to use in the 
// search request
const backendUrl = import.meta.env.VITE_BACKEND_URL


export async function searchCoinsAction({ request }) {
    // extract the search query from the form data submitted 
    // with the action's request
    const formData = await request.formData()
    const query = formData.get( "searchTerm" )

    // get the current access token from local storage to include in the
    // Authorization header of the search request
    const accessToken = localStorage.getItem( "greenfinance-token" )

    try {
        // make a GET request to the backend search endpoint with the 
        // search query as a query parameter
        const response = await fetch( 
            `${ backendUrl }/app/assets/search?query=${ query }`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${ accessToken }`
                }
            }
        )

        // if the response is not ok, check if it's a 401 error to attempt
        // token refresh, otherwise return an error message to the user
        if ( !response.ok ) {
            // if the response status is 401, attempt to refresh the access
            // token and retry the search request with the new token
            if ( response.status === 401 ) {
                // if the response status is 401, attempt to refresh the 
                // access token
                const { status, data } = await refreshOn401()
            
                // if the token refresh was successful, retry the original 
                // search request with the new access token, otherwise 
                // return an error
                if ( status === "success" ) {
                    // if the token refresh was successful, retry the 
                    // original search request with the new access token
                    const newAccessToken = data.user.accessToken

                    // retry the original search request with the new 
                    // access token
                    const retryResponse = await fetch( 
                        `${ backendUrl }/app/assets/search?query=${ query }`,
                        {
                            method: "GET",
                            headers: {
                                "Authorization": `Bearer ${ newAccessToken }`
                            }
                        }
                    )

                    // if the retry response is not ok, return an error 
                    // message to the user
                    if ( !retryResponse.ok ) {
                        return {
                            status: "error",
                            error: { 
                                message: "An error occurred while searching for coins. Please try again later." 
                            }
                        }
                    }

                    // if the retry response is ok, return the search 
                    // results and the new user data with the refreshed 
                    // access token to update the user's session through
                    // invoking route
                    const { status, data: retryData } = await retryResponse.json()

                    return {
                        status,
                        data: retryData,
                        newUserData: data.user
                    }
                } else {
                    // if the token refresh failed, return an error message 
                    // to the user
                    return {
                        status: "error",
                        error: { 
                            message: "An error occurred while searching for coins. Please try again later." 
                        }
                    }
                }
            } else {
                // if the response status is not 401, return an error 
                // message to the invoking route to display to the user
                const { status, error } = await response.json()

                return { status, error }
            }
        } else {
            // if the response is ok, return the search results to the 
            // invoking route to update the search results state and display 
            // the results to the user
            const { status, data } = await response.json()

            return {
                status,
                data
            }
        }
    } catch {
        // if an error occurs during the fetch request (e.g. network error), 
        // return an error message to the user to display through the 
        // invoking route
        return {
            status: "error",
            error: { 
                message: "An error occurred while searching for coins. Please try again later." 
            }
        }
    }
}