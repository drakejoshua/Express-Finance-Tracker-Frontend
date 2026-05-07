import { useContext, useState, createContext, useEffect, useRef } from 'react'
import { ERROR_CODES } from '../utils/errors'

const AuthContext = createContext()

const backendUrl = import.meta.env.VITE_BACKEND_URL

export function useAuthProvider() {
    return useContext( AuthContext )
}

export async function refreshOn401( count = 2 ) {
    try {
        const resp = await fetch( `${ backendUrl }/auth/refresh`, {
            method: 'POST',
            credentials: 'include' // include cookies for refresh token
        } )

        if ( !resp.ok ) {
            if (
                resp.status === 401 ||  
                count > 0 
            ) {
                // if the error indicates an invalid refresh token, it may be due to an expired refresh token, so we can attempt to refresh the access token one more time before giving up and returning the error
                return await refreshOn401( count - 1 )
            } else {
                const { status, error } = await resp.json()

                return { status, error }
            }
        } else {
            const { status, data } = await resp.json()

            return { status, data }
        }
    } catch ( error ) {
        return { 
            status: "error", 
            error: {
                code: ERROR_CODES.FRONTEND_ERROR,
                message: error.message
            }
        }
    }
}

export function AuthProvider({ children }) {
    // state to hold currently logged in user data with auth status
    // initially set to loading status until the app determines if user is logged in or not
    // possible status values: loading, loaded, error, unavailable
    const [currentlyLoggedInUser, setCurrentlyLoggedInUser] = useState( { status: "loading" } ) 
    const silentRefreshRef = useRef( null )

    async function signUp( email, password, firstName, lastName, photo ) {
        try {
            // create form data for signup request
            const signupFormData = new FormData()

            // append required fields to form data
            signupFormData.append( 'email', email )
            signupFormData.append( 'password', password )
            signupFormData.append( 'name', firstName + ' ' + lastName )

            // append optional photo if it exists
            if ( photo ) signupFormData.append( 'photo', photo )

            // make signup request to backend
            const resp = await fetch( `${ backendUrl }/auth/signup`, {
                method: 'POST',
                body: signupFormData
            } )

            // check if response is successful and handle accordingly
            if ( !resp.ok ) {
                // if response is not ok, attempt to parse error 
                // details from response body and return them
                const { status, error } = await resp.json()

                return { status, error }
            } else {
                // if response is ok, parse user data from response body, update
                // currently logged in user state, and return success status and data
                const { status, data } = await resp.json()

                setCurrentlyLoggedInUser( { status: "loaded", data: data.user } )
                return { status, data }
            }
        } catch ( error ) {
            // if an unexpected error occurs during the signup process 
            // (e.g. network error, frontend bug), return a standardized error 
            // response with a generic message and a specific error code for 
            // frontend errors
            return { 
                status: "error", 
                error: {
                    code: ERROR_CODES.FRONTEND_ERROR,
                    message: error.message || "An unexpected error occurred during signup. Please try again later."
                }
            }
        }
    }

    async function logIn( email, password ) {
        try {
            // make login request to backend with email and password
            const resp = await fetch( `${ backendUrl }/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            } )

            // check if response is successful and handle accordingly
            if ( !resp.ok ) {
                // if response is not ok, attempt to parse error 
                // details from response body and return them
                const { status, error } = await resp.json()

                return { status, error }
            } else {
                // if response is ok, parse user data from response body, update
                // currently logged in user state, and return success status and data
                const { status, data } = await resp.json()

                setCurrentlyLoggedInUser( { status: "loaded", data: data.user } )

                return { status, data }
            }
        } catch ( error ) {
            // if an unexpected error occurs during the login process
            // (e.g. network error, frontend bug), return a standardized error
            // response with a generic message and a specific error code for
            // frontend errors
            return { 
                status: "error", 
                error: {
                    code: ERROR_CODES.FRONTEND_ERROR,
                    message: error.message || "An unexpected error occurred during login. Please try again later."
                }
            }
        }
    }

    async function getCurrentUser( accessToken ) {
        try {
            // make request to backend to get current user data with access token
            const resp = await fetch( `${ backendUrl }/auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${ accessToken }`
                }
            } )

            // check if response is successful and handle accordingly
            if ( !resp.ok ) {
                // if response is not ok, attempt to parse error 
                // details from response body and return them
                if ( resp.status === 401 ) {
                    // since response status of 401 indicates an 
                    // authentication error, it can't be parsed as json,
                    // so we return a standardized error response with a specific error code for authentication errors in this case
                    return { 
                        status: "error", 
                        error: {
                            code: ERROR_CODES.INVALID_AUTHORIZATION_TOKEN,
                            message: "Invalid or expired authorization data. Please log in again."
                        }
                    }
                } else {
                    const { status, error } = await resp.json()
    
                    return { status, error }
                }
            } else {
                // if response is ok, parse user data from response body, update
                // currently logged in user state, and return success status and data
                const { status, data } = await resp.json()

                setCurrentlyLoggedInUser( { status: "loaded", data: data.user } )

                return { status, data }
            }
        } catch ( error ) {
            // if an unexpected error occurs during the process
            // (e.g. network error, frontend bug), return a standardized error
            // response with a generic message and a specific error code for
            // frontend errors
            return { 
                status: "error", 
                error: {
                    code: ERROR_CODES.FRONTEND_ERROR,
                    message: error.message || "An unexpected error occurred while fetching user data. Please try again later."
                }
            }
        }
    }

    async function refreshAccessToken( count = 2 ) {
        try {
            // make request to backend to refresh access token
            const resp = await fetch( `${ backendUrl }/auth/refresh`, {
                method: 'POST',
                credentials: 'include' // include cookies for refresh token
            } )

            // check if response is successful and handle accordingly
            if ( !resp.ok ) {
                // recursively attempt to refresh access token one 
                // more time if the error indicates an invalid 
                // refresh token, which may be due to an expired refresh 
                // token, before giving up and returning the error response. 
                // This is to handle the case where the refresh token has just 
                // expired and a new one has been issued, so we can try 
                // refreshing again with the new refresh token before concluding
                // that the user needs to log in again.
                if ( 
                    resp.status === 401 &&
                    count > 0 
                ) {
                    // if the error indicates an invalid refresh token, it may be due to an expired refresh token, so we can attempt to refresh the access token one more time before giving up and returning the error
                    return await refreshAccessToken( count - 1 )
                }

                // if response is not ok and it's not because of a 
                // attempt to parse error details from response body and return them
                const { status, error } = await resp.json()

                return { status, error }
            } else {
                // if response is ok, parse new access token from response body and return it
                const { status, data } = await resp.json()

                return { status, data }
            }
        } catch ( error ) {
            // if an unexpected error occurs during the process
            // (e.g. network error, frontend bug), return a standardized error
            // response with a generic message and a specific error code for
            // frontend errors
            return { 
                status: "error", 
                error: {
                    code: ERROR_CODES.FRONTEND_ERROR,
                    message: error.message || "An unexpected error occurred while refreshing access token. Please try again later."
                }
            }
        }
    }

    async function refreshUserOnMount() {
        const accessToken = localStorage.getItem( 'greenfinance-token' )

        if ( currentlyLoggedInUser.status == "loading" && accessToken ) {
            try {
                // if there is an access token in local storage, 
                // attempt to refresh it and fetch current user data
                const { status, data } = await refreshAccessToken()

                if ( status === "error" ) {
                    // if refreshing access token fails, set currently logged
                    // in user state to error with error details
                    setCurrentlyLoggedInUser( { status: "error" } )
                } else {
                    // if refreshing access token succeeds, update 
                    // currently logged in user state with new access token
                    // and user data
                    setCurrentlyLoggedInUser( { status: "loaded", data: data.user } )
                }
            } catch {
                // if an unexpected error occurs during the process
                // (e.g. network error, frontend bug), set currently logged in 
                // user state to unavailable to indicate that the app has finished 
                // checking for login status but a non-authentication issue occured
                setCurrentlyLoggedInUser( { status: "unavailable" } )
            }
        } else {
            // if there is no access token in local storage, 
            // set currently logged in user state to loaded with 
            // unavailable status to indicate there's no access token 
            // present in localStorage
            setCurrentlyLoggedInUser( { status: "unavailable" } )
        }
    }

    // function to handle silent refresh of access token in the 
    // background before it expires to keep user logged in without 
    // interruptions, which can be called from components that need 
    // to ensure the user has a valid access token for making
    //  authenticated requests.
    async function handleSilentRefresh() {
        const accessTokenExpiryInMilliseconds = currentlyLoggedInUser.data.expires_in * 1000

        silentRefreshRef.current = setTimeout( async () => {
            try {
                const { status, data } = await refreshAccessToken()

                if ( status === "error" ) {
                    // if refreshing access token fails, set currently 
                    // logged in user state to error 
                    setCurrentlyLoggedInUser( { status: "error" } )
                } else {
                    // if refreshing access token succeeds, update 
                    // currently logged in user state with new access token
                    // and user data
                    setCurrentlyLoggedInUser( { status: "loaded", data: data.user } )

                    // set up next silent refresh based on new access 
                    // token's expiry time
                    handleSilentRefresh() 
                }
            } catch {
                // if an unexpected error occurs during the process
                // (e.g. network error, frontend bug), set currently logged in 
                // user state to unavailable to indicate that the app has finished 
                // checking for login status but a non-authentication issue occured
                setCurrentlyLoggedInUser( { status: "unavailable" } )
            }
        }, accessTokenExpiryInMilliseconds - 30000 ) // refresh 30 secs before expiry
    }

    useEffect( function() {
        // on initial load, attempt to refresh access token 
        // to determine if user is logged in and fetch current 
        // user data
        refreshUserOnMount()
    }, [] )

    useEffect( function() {
        // whenever currently logged in user state changes, 
        // update local storage with new access token if user 
        // is logged in, or remove access token from local storage 
        // if user is logged out or there is an error
        if ( currentlyLoggedInUser.status === "loaded" ) {
            localStorage.setItem( 'greenfinance-token', currentlyLoggedInUser.data.access_token )

            // set up silent refresh of access token in the background
            // before it expires to keep user logged in without interruptions
            handleSilentRefresh()
        } else {
            if ( currentlyLoggedInUser.status === "error" ) {
                localStorage.removeItem( 'greenfinance-token' )
            }
        }
    }, [ currentlyLoggedInUser ] )

    return (
        <AuthContext.Provider 
            value={{
                currentlyLoggedInUser,
                signUp,
                logIn,
                getCurrentUser
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}
