import { useContext, useState, createContext } from 'react'
import { ERROR_CODES } from '../utils/errors'

const AuthContext = createContext()

const backendUrl = import.meta.env.BACKEND_URL || "http://localhost:8000"

export function useAuthProvider() {
    return useContext( AuthContext )
}

export function AuthProvider({ children }) {
    // state to hold currently logged in user data with auth status
    // initially set to loading status until the app determines if user is logged in or not
    // possible status values: loading, loaded, error, unavailable
    const [currentlyLoggedInUser, setCurrentlyLoggedInUser] = useState( { status: "loading" } ) 

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

    return (
        <AuthContext.Provider 
            value={{
                currentlyLoggedInUser,
                signUp
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}
