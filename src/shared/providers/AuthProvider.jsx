/* 
    AuthProvider.jsx

    This is the provider for managing auth state in the application.
    It uses a context to manage auth state and provides helper functions
    for interacting and manipulating the auth state in the context to 
    child components within it's context provider
*/




// import required dependencies
import { useContext, useState, createContext, useEffect, useRef } from 'react'
import { ERROR_CODES } from '../utils/errors'

// create context to store and share auth state and helper functions
const AuthContext = createContext()

// get the backend URL from environment variables for making API 
// requests to the backend
const backendUrl = import.meta.env.VITE_BACKEND_URL

// custom hook to access auth context and its values in child components
// in the AuthProvider's context provider
export function useAuthProvider() {
    return useContext( AuthContext )
}


// refreshOn401()
// This function is designed to be used in the actions and loaders of pages 
// in the app that need to make authenticated requests to the backend but 
// can't directly access the context of the AuthProvider to call its helper 
// functions for refreshing the access token and updating the currently 
// logged in user state. This function can be called from those pages' 
// actions and loaders to attempt refreshing the access token and updating 
// the currently logged in user state in the AuthProvider's context if a 401 
// error is encountered, which indicates an authentication error that may be 
// due to an expired access token. This function will recursively attempt to 
// refresh the access token one more time if it encounters a 401 error during 
// the refresh attempt before giving up and returning the error response.
export async function refreshOn401( count = 2 ) {
    try {
        // make request to backend to refresh access token
        const resp = await fetch( `${ backendUrl }/auth/refresh`, {
            method: 'POST',
            credentials: 'include' // include cookies for refresh token
        } )

        // check if response is successful and handle accordingly
        if ( !resp.ok ) {
            if (
                resp.status === 401 &&  
                count > 0 
            ) {
                // if the error indicates an invalid refresh token, 
                // it may be due to an expired refresh token, so we can 
                // attempt to refresh the access token one more time before 
                // giving up and returning the error
                return await refreshOn401( count - 1 )
            } else {
                // if response is not ok and it's not because of a 401 Unauthorized status
                // attempt to parse error details from response body and return them
                const { status, error } = await resp.json()

                return { status, error }
            }
        } else {
            // if response is ok, parse new access token from response body 
            // and return it so that the calling page can update the access token 
            // it's using for making authenticated requests to the backend
            const { status, data } = await resp.json()

            return { status, data }
        }
    } catch ( error ) {
        // if an unexpected error occurs during the process (e.g. network error, 
        // frontend bug), return a standardized error response with a generic 
        // message and a specific error code for frontend errors
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

    // timer ref to handle silent refresh of access token in the 
    // background before it expires to keep user logged in without 
    // interruptions, which can be set and cleared as needed based 
    // on changes to currently logged in user state
    const silentRefreshRef = useRef( null )

    // Auth Helper functions for interacting with auth state in the context and making
    // authenticated requests to the backend

    // signUp()
    // This function is called from the signup page to handle signing up a new user. 
    // It takes in the user's email, password, first name, last name, and an 
    // optional photo file as parameters, makes a request to the backend to 
    // create a new user account with those details, and updates the currently 
    // logged in user state in the context if the signup is successful. It 
    // also includes error handling to return standardized error responses 
    // for different failure scenarios.
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
                body: signupFormData,
                credentials: 'include' // include cookies for refresh token
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

    // logIn()
    // This function is called from the login page to handle logging in an existing user. 
    // It takes in the user's email and password as parameters, makes a request to the
    // backend to authenticate the user with those credentials, and updates the currently
    // logged in user state in the context if the login is successful. It also includes
    // error handling to return standardized error responses for different failure scenarios.
    async function logIn( email, password ) {
        try {
            // make login request to backend with email and password
            const resp = await fetch( `${ backendUrl }/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // include cookies for refresh token
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

    // logOut()
    // This function is called from the logout page to handle logging out the current user.
    // It makes a request to the backend to clear the refresh token cookie and updates the
    // currently logged in user state in the context. It also includes error handling to 
    // return standardized error responses for different failure scenarios.
    async function logOut() {
        try {
            // make logout request to backend to clear refresh token 
            // cookie
            const resp = await fetch( `${ backendUrl }/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${ currentlyLoggedInUser.data.access_token }`
                },
                credentials: 'include' // include cookies for refresh token
            } )

            // check if response is successful and handle accordingly
            if ( !resp.ok ) {
                if ( resp.status === 401 ) {
                    // if response status of 401 indicates an authentication error, 
                    // it can't be parsed as json, so we return a standardized error 
                    // response with a specific error code for authentication errors 
                    // in this case
                    return {
                        status: "error",
                        error: {
                            code: ERROR_CODES.INVALID_AUTHORIZATION_TOKEN,
                            message: "Invalid or expired authorization data. Please log in again."
                        }
                    }
                } else {
                    // if response is not ok and it's not because of a 401 
                    // status, attempt to parse error details from response
                    // body and return them
                    const { status, error } = await resp.json()
    
                    return { status, error }
                }
            } else {
                // if response is ok, parse user data from response body, update
                // currently logged in user state, and return success status and data
                const { status, data } = await resp.json()

                setCurrentlyLoggedInUser( { status: "logout" } )

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

    // updateProfileInfo()
    // This function is called from the profile page to handle updating the 
    // current user's profile information. It takes in an object with the 
    // updated profile fields and an optional boolean indicating whether to 
    // delete the user's photo, makes a request to the backend to update 
    // the user's profile with the provided information, and updates the 
    // currently logged in user state in the context if the update is successful. 
    // It also includes error handling to return standardized error responses 
    // for different failure scenarios.
    async function updateProfileInfo( updateData, deletePhoto = false ) {
        try {
            // create form data for profile update request
            const updateFormData = new FormData()

            // append updated fields to form data ( check if they're 
            // not the same as the current values in currently logged 
            // in user data to avoid unnecessary updates )
            for ( const key in updateData ) {
                if ( key !== "password" ) {
                    if ( updateData[ key ] !== currentlyLoggedInUser.data[ key ] ) {
                        updateFormData.append( key, updateData[ key ] )
                    }
                } else {
                    // for password field, we check if it's not an empty string before appending it to the form data, since an empty string indicates that the user doesn't want to update their password
                    if ( updateData.password.trim() !== "" ) {
                        updateFormData.append( 'password', updateData.password )
                    }
                }
            }

            // check if there are any fields to update before making 
            // the request
            if ( Array.from( updateFormData.keys() ).length === 0 && !deletePhoto ) {
                return { 
                    status: "error",
                    error: {
                        code: ERROR_CODES.NO_PROFILE_CHANGES,
                        message: "No updated fields provided. Please make changes to your profile before submitting an update."
                    }
                }
            }

            // make profile update request to backend
            const resp = await fetch( `${ backendUrl }/auth/update?delete_photo=${ deletePhoto }`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${ currentlyLoggedInUser.data.access_token }`
                },
                body: updateFormData,
                credentials: 'include' // include cookies for refresh token
            } )

            // check if response is successful and handle accordingly
            if ( !resp.ok ) {
                if ( resp.status === 401 ) {
                    // if response status of 401 indicates an authentication error, it can't be parsed as json, so we return a standardized error response with a specific error code for authentication errors in this case
                    return { 
                        status: "error", 
                        error: {
                            code: ERROR_CODES.INVALID_AUTHORIZATION_TOKEN,
                            message: "Invalid or expired authorization data. Please log in again."
                        }
                    }
                } else {
                    // if response is not ok and it's not because of a 401 status, attempt to parse error details from response body and return them
                    const { status, error } = await resp.json()

                    return { status, error }
                }
            } else {
                // if response is ok, parse updated user data from response body, update currently logged in user state, and return success status and data
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
                    message: error.message || "An unexpected error occurred while updating user profile. Please try again later."
                }
            }
        }
    }

    // getCurrentUser()
    // This function can be called from any page in the app that needs 
    // to fetch the current user's data with a valid access token for 
    // making authenticated requests to the backend. It takes in an 
    // access token as a parameter, makes a request to the backend to 
    // get the current user data with that access token, and updates 
    // the currently logged in user state in the context if the request 
    // is successful. It also includes error handling to return 
    // standardized error responses for different failure scenarios.
    async function getCurrentUser( accessToken ) {
        try {
            // make request to backend to get current user data with access token
            const resp = await fetch( `${ backendUrl }/auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${ accessToken }`
                },
                credentials: 'include' // include cookies for refresh token
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

    // refreshAccessToken()
    // This function is designed to handle refreshing the access token 
    // using the refresh token stored in the cookies. It makes a 
    // request to the backend to refresh the access token, and if 
    // successful, it returns the new access token and user data. 
    // If it encounters a 401 error during the refresh attempt, which 
    // may indicate that the refresh token has expired, it will 
    // recursively attempt to refresh the access token one more time 
    // before giving up and returning the error response. This is to 
    // handle the case where the refresh token has just expired and a new 
    // one has been issued, so we can try refreshing again with the new 
    // refresh token before concluding that the user needs to log in again. 
    // It also includes error handling to return standardized error responses 
    // for different failure scenarios.
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

    // refreshUserOnMount()
    // This function is designed to be called when the AuthProvider component 
    // mounts to attempt refreshing the access token and fetching the current
    // user data to determine if the user is logged in or not and populate the
    // currently logged in user state in the context accordingly. It checks if
    // there is an access token in local storage, and if so, it attempts to
    // refresh the access token and fetch the current user data. If there is no
    // access token in local storage, it sets the currently logged in user state
    // to unavailable to indicate that there's no access token present. It also
    // includes error handling to set the currently logged in user state to
    // error or unavailable based on different failure scenarios during the
    // refresh and fetch process.
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

    // function to handle changes to currently logged in user state
    // from pages using refreshOn401() through their actions or loaders
    // that can't access the context of the AuthProvider. This function
    // sanitizes the value of the incoming changes before updating state 
    // in the AuthProvider's context. This makes it possible for pages 
    // that use refreshOn401() to trigger updates to the currently logged 
    // in user state in the AuthProvider's context (e.g. updating the access
    // token if refresh is needed) even though they can't directly 
    // access the context of the AuthProvider.
    function processCurrentUserChange( newUserData ) {
        setCurrentlyLoggedInUser( { status: "loaded", data: newUserData } )
    }

    useEffect( function() {
        // on initial load, attempt to refresh access token 
        // to determine if user is logged in and fetch current 
        // user data
        refreshUserOnMount()
    }, [] )

    useEffect( function() {
        // clear any existing silent refresh timers since user 
        // is logging out or there is an error with their 
        // authentication data, so we don't want to attempt to 
        // refresh the access token anymore until they log in 
        // again
        if ( silentRefreshRef.current ) {
            clearTimeout( silentRefreshRef.current )
        }
        
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
            if ( 
                currentlyLoggedInUser.status === "error" || 
                currentlyLoggedInUser.status === "logout" 
            ) {
                localStorage.removeItem( 'greenfinance-token' )
            }
        }
    }, [ currentlyLoggedInUser ] )


    return (
        // provide auth state and helper functions to child 
        // components in the context provider
        <AuthContext.Provider 
            value={{
                currentlyLoggedInUser,
                signUp,
                logIn,
                logOut,
                getCurrentUser,
                processCurrentUserChange,
                updateProfileInfo
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}
