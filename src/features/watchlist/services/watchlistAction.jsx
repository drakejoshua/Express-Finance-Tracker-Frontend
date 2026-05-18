/* 
    watchlistAction.jsx 

    This file contains the action functions for adding and 
    removing coins from the user's watchlist. The functions handle the 
    API requests to the backend, including authentication with the 
    access token and refreshing the token if a 401 Unauthorized response 
    is received.
*/


// import the refreshOn401 function from the AuthProvider to 
// handle token refresh logic when a 401 Unauthorized response is received
import { refreshOn401 } from "../../../shared/providers/AuthProvider";

// get the backend URL from environment variables
const backendUrl = import.meta.env.VITE_BACKEND_URL


// addToWatchlist(coinId)
// This function sends a POST request to the backend API to add a coin
// to the user's watchlist. It includes the access token in the request 
// headers for authentication. If a 401 Unauthorized response is received,
// it attempts to refresh the token and retry the request. The function
// returns the result of the operation, including any new user data if the 
// token was refreshed successfully.
async function addToWatchlist( coinId ) {
    // retrieve the access token from local storage
    const accessToken = localStorage.getItem("greenfinance-token")

    try {
        // make a POST request to the backend API to add the coin to the watchlist,
        // including the access token in the Authorization header for authentication
        const response = await fetch( `${backendUrl}/app/watchlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ symbol: coinId }),
        })

        // if the response is not ok, check if it's a 401 Unauthorized error
        // and attempt to refresh the token if it is. If the token refresh is successful,
        // retry the original request with the new token. If any step fails, log the error
        // and return an appropriate error message.
        if ( !response.ok ) {
            if ( response.status === 401 ) {
                // if 401 unauthorized error, send request to refresh token to the
                // backend
                const { status, data } = await refreshOn401()

                // check status of the refresh request if it's successful
                if ( status === "success" ) {
                    // if successful, retry the POST request to add the 
                    // coin to the watchlist with the new access token
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

                    // if the retry request fails, return an error message indicating 
                    // that the session has expired. If the retry request is successful, 
                    // extract the JSON from the response body and return the result of 
                    // the operation, including any  new user data.
                    if ( !retryResponse.ok ) {
                        // if the retry request fails, return an error message indicating 
                        // that the session has expired
                        return {
                            status: "error",
                            error: {
                                message: "Session expired. Please log in again."
                            }
                        }
                    } else {
                        // if the retry request is successful, extract the JSON from 
                        // the response body and return the result of the operation, 
                        // including any new user data
                        const { data: retryData } = await retryResponse.json()

                        return {
                            status: "success",
                            data: retryData,
                            newUserData: data.user
                        }
                    }
                } else {
                    // if the token refresh fails, return an error message indicating 
                    // that the session has expired
                    return {
                        status: "error",
                        error: {
                            message: "Session expired. Please log in again."
                        }
                    }
                }
            } else {
                // if the error is not a 401, extract the error message from the 
                // response and return an error message with that message or a 
                // default message
                const { error } = await response.json()

                return {
                    status: "error",
                    error
                }
            }
        }

        // if the initial request is successful, extract the JSON from the 
        // response body and return the result of the operation with the data
        const data = await response.json()

        return {
            status: "success",
            data: data
        }
    } catch {
        // if any error occurs during the fetch request or token refresh 
        // process, return an error message indicating that the operation 
        // failed
        return {
            status: "error",
            error: {
                message: "Failed to add coin to watchlist. Please try again later."
            }
        }
    }
}


// removeFromWatchlist(coinId)
// This function sends a DELETE request to the backend API to remove a coin
// from the user's watchlist. It includes the access token in the request 
// headers for authentication. If a 401 Unauthorized response is received,
// it attempts to refresh the token and retry the request. The function
// returns the result of the operation, including any new user data if the
// token was refreshed successfully.
async function removeFromWatchlist( coinId ) {
    // retrieve the access token from local storage
    const accessToken = localStorage.getItem("greenfinance-token")

    try {
        // make a DELETE request to the backend API to remove the coin from the watchlist,
        // including the access token in the Authorization header for authentication
        const response = await fetch( `${backendUrl}/app/watchlist/${coinId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })

        // if the response is not ok, check if it's a 401 Unauthorized error
        // and attempt to refresh the token if it is. If the token refresh is successful,
        // retry the original request with the new token. If any step fails, log the error
        // and return an appropriate error message.
        if ( !response.ok ) {
            if ( response.status === 401 ) {
                // if 401 unauthorized error, send request to refresh token to the
                // backend
                const { status, data } = await refreshOn401()

                if ( status === "success" ) {
                    // if successful, retry the DELETE request to remove the coin from the 
                    // watchlist with the new access token
                    const newAccessToken = data.user.accessToken

                    // retry the original request with the new access token to remove the coin 
                    // from the watchlist. if the retry request fails, return an error message 
                    // indicating that the session has expired. If the retry request is 
                    // successful, extract the JSON from the response body and return the 
                    // result of the operation, including any new user data.
                    const retryResponse = await fetch( `${backendUrl}/app/watchlist/${coinId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${newAccessToken}`
                        }
                    })

                    // if the retry request fails, return an error message indicating 
                    // that the session has expired. If the retry request is successful, 
                    // extract the JSON from the response body and return the result 
                    // of the operation, including any new user data.
                    if ( !retryResponse.ok ) {
                        return {
                            status: "error",
                            error: {
                                message: "Session expired. Please log in again."
                            }
                        }
                    } else {
                        // since retry request was successful, extract the JSON from the response body and 
                        // return the result of the operation, including any new user data
                        const { data: retryData } = await retryResponse.json()

                        return {
                            status: "success",
                            data: retryData,
                            newUserData: data.user
                        }
                    }
                } else {
                    // if the token refresh fails, return an error message indicating 
                    // that the session has expired
                    return {
                        status: "error",
                        error: {
                            message: "Session expired. Please log in again."
                        }
                    }
                }
            } else {
                // if the error is not a 401, extract the error message from the 
                // response and return an error message with that message
                const { error } = await response.json()

                return {
                    status: "error",
                    error
                }
            }
        }

        // if the initial request is successful, extract the JSON from the 
        // response body and return the result of the operation with the data
        const data = await response.json()

        return {
            status: "success",
            data: data
        }
    } catch {
        // if any error occurs during the fetch request or token refresh 
        // process, return an error message indicating that the operation 
        // failed
        return {
            status: "error",
            error: {
                message: "Failed to remove coin from watchlist. Please try again later."
            }
        }
    }
}


// watchlistAction()
// This is the main action function that will be used in the watchlist route.
// It retrieves the form data and HTTP method from the request object, and
// calls the appropriate function (addToWatchlist or removeFromWatchlist) based on the method. 
// The function returns the result of the operation, including any new user data if the 
// token was refreshed successfully, and the HTTP method used for the action.
export async function watchlistAction({ request }) {
    // retrieve the form data and HTTP method from the request object
    const formData = await request.formData()
    const method = request.method

    // call the appropriate function based on the HTTP method 
    // and return the result of the operation, including any new 
    // user data if the token was refreshed successfully and the HTTP 
    // method used for the action in the returned object. 
    switch ( method ) {
        // for a POST request, call the addToWatchlist function with the 
        // coinId from the form data and return the result along with 
        // the method used
        case "POST": {
            const coinId = formData.get("coinId")

            const result = await addToWatchlist( coinId )
            
            return {
                ...result,
                method: "POST"
            }
        }

        // for a DELETE request, call the removeFromWatchlist function 
        // with the coinId from the form data and return the result 
        // along with the method used
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