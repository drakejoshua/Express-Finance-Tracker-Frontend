// AppSearchView.jsx

// This component provides a search input for users to search for 
// coins/assets, and displays the search results in a popover. It uses 
// the searchCoinsAction to make requests to the backend search endpoint 
// and handles the loading, success, and error states of the search 
// request to provide feedback to the user. It also handles sending 
// newUserData to the AuthProvider context to update the user's 
// session if a new access token is obtained through refreshing on a 
// 401 response from the backend during the search request.


// import necessary dependencies and components
import { useEffect, useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import SearchResultItem from './SearchResultItem'
import useDebounce from '../hooks/useDebounce';
import colors from 'tailwindcss/colors';
import { ScaleLoader } from 'react-spinners'
import { 
    useFetcher
} from 'react-router-dom'
import { useAuthProvider } from "../providers/AuthProvider.jsx"



export default function AppSearchView({ className, handleMobileClose, ...props }) {
    // state for managing the visibility of the search results popover, 
    // the current search term input by the user, the debounced search 
    // term for triggering search requests, and whether a search result 
    // item has been clicked to prevent the popover from closing when 
    // the search input loses focus due to a click on a search result item
    const [ isPopoverOpen, setIsPopoverOpen ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState("")
    const debouncedSearchTerm = useDebounce( searchTerm )
    const [ isSearchItemClicked, setIsSearchItemClicked ] = useState( false )

    const fetcher = useFetcher()
    const { status, data, error, newUserData } = fetcher.data || {};
    const state = fetcher.state;

    const { processCurrentUserChange } = useAuthProvider()
    
    function handleUserSearch( searchTerm ) {
        if ( searchTerm ) { 
            setIsPopoverOpen( true )

            fetcher.submit( 
                { searchTerm },
                { method: "post" }
            )
        } else {
            setIsPopoverOpen( false )
        }
    }

    function handleSearchInputBlur() {
        if ( !isSearchItemClicked ) {
            setIsPopoverOpen( false )
            handleMobileClose()
        }
    }

    useEffect( function() {
        handleUserSearch( debouncedSearchTerm )
    }, [ debouncedSearchTerm ])

    useEffect( function() {
        if ( newUserData ) {
            processCurrentUserChange( newUserData )
        }
    }, [ newUserData ])


    return (
        <div 
            className={ className }
            {...props}
        >
            <div
                className='
                    flex
                    gap-4
                    items-center
                    px-5 py-2.5
                    bg-gray-200
                    rounded-lg
                '
            >
                <FaMagnifyingGlass 
                    className='
                        text-gray-800
                    '
                />

                <input 
                    type="text" 
                    placeholder='Search...' 
                    className='
                        focus:outline-none
                        grow
                    '
                    value={ searchTerm }
                    onChange={ ( e ) => setSearchTerm( e.target.value ) }
                    onBlur={ handleSearchInputBlur }
                />
            </div>

            {/* search popover */}
            { isPopoverOpen && <div
                className='
                    absolute
                    top-full
                    right-0
                    mt-2
                    w-full
                    bg-gray-100
                    p-3
                    rounded-md
                    shadow-sm
                    shadow-gray-300
                '
            >
                {/* search result loading state */}
                { ( state === "loading" || state === "submitting" ) &&
                    <div
                        className='
                            flex
                            gap-3
                            items-center
                            justify-center
                            py-3
                        '
                    >
                        <ScaleLoader
                            color={ colors.gray['800'] }
                            loading={ true }
                            height={25}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        
                        <span>Searching For "{ debouncedSearchTerm }"</span>
                    </div>
                }

                {/* search result not-found state */}
                { ( 
                    state === "idle" && 
                    status === "success" && 
                    data.length === 0 ) && 
                    <div
                        className='
                            flex
                            gap-3
                            items-center
                            justify-center
                            py-3
                        '
                    >
                        No results found for "{ debouncedSearchTerm }"
                    </div>
                }

                {/* search result error state */}
                { ( 
                    state === "idle" && 
                    status === "error" ) && 
                    <div
                    className='
                        flex
                        gap-3
                        items-center
                        justify-center
                        py-3
                    '
                >
                    An error occurred while searching for "{ debouncedSearchTerm }". 
                    Error: { error.message }
                    </div>
                }

                {/* search result list */}
                { ( 
                    state === "idle" && 
                    status === "success" && 
                    data.length > 0 ) && 
                    <div
                        className='
                            h-[40vh]
                            overflow-y-auto
                            scrollbar-thin
                            scrollbar-thumb-gray-300
                            scrollbar-track-gray-100
                        '
                    >
                        { data.map((item) => (
                            <SearchResultItem 
                                key={item.id}
                                imgSource={item.image}
                                name={item.name}
                                id={item.id}
                                onMouseDown={ () => setIsSearchItemClicked( true ) }
                            />
                        )) }
                    </div>
                }
            </div>}
        </div>
    )
}
