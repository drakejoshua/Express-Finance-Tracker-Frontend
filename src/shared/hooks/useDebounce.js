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
