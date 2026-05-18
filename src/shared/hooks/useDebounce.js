/* 
    useDebounce()

    This is a custom React hook that provides a debounced version of a state value.
    The hook takes in a searchTerm and an optional debounceTime (defaulting to 500 milliseconds) 
    as parameters. 

    Example:

    const [ searchTerm, setSearchTerm ] = useState('')
    const debouncedSearchTerm = useDebounce( searchTerm, 500 )

    useEffect( function() {
        // This effect will only run when the debouncedSearchTerm changes,
        // which will only happen after the user has stopped typing for 500ms.
        
        fakeSearchFunction( debouncedSearchTerm )
    }, [ debouncedSearchTerm ])
*/


// import hook dependencies
import { useState, useEffect, useRef } from 'react'

// The useDebounce() hook used for debouning input values across 
// multiple locations in the app ( i.e. searchbar in AppLayout )
export default function useDebounce( searchTerm, debounceTime = 500 ) {
    const [ deboucedSearchTerm, setDebouncedSearchTerm ] = useState( searchTerm )
    const debounceTimer = useRef()
    
    useEffect( function() {
        clearTimeout( debounceTimer.current )

        debounceTimer.current = setTimeout( function() {
            setDebouncedSearchTerm( searchTerm )
        }, debounceTime )
    }, [ searchTerm ])

    return deboucedSearchTerm
}
