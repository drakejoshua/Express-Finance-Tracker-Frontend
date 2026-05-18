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
    // popover state to control the visibility of the search results popover
    const [ isPopoverOpen, setIsPopoverOpen ] = useState(false);

    // search term state to store the current value of the search input and 
    // a debounced version of the search term to control when the search request 
    // is made to the backend
    const [ searchTerm, setSearchTerm ] = useState("")
    const debouncedSearchTerm = useDebounce( searchTerm )

    // state to track if a search result item was clicked to prevent the 
    // popover from closing when the search input loses focus due to clicking 
    // on a search result item
    const [ isSearchItemClicked, setIsSearchItemClicked ] = useState( false )

    // useFetcher hook from react-router-dom to make requests to the backend search
    // endpoint and manage the loading, success, and error states of the search request.
    // The fetcher will also handle sending any new user data obtained from refreshing the token
    // to the AuthProvider context to update the user's session if necessary.
    const fetcher = useFetcher()
    const { status, data, error, newUserData } = fetcher.data || {};
    const state = fetcher.state;

    // get the processCurrentUserChange function from the AuthProvider 
    // context to update the user's session if new user data is obtained 
    // from refreshing the token during the search request
    const { processCurrentUserChange } = useAuthProvider()
    
    // handleUserSearch()
    // This function is called to perform the search when the user types in the search input.
    // It checks if there is a search term, and if so, it opens the popover and 
    // submits the search term to the backend using the fetcher. If there is no 
    // search term, it closes the popover.
    function handleUserSearch( searchTerm ) {
        if ( searchTerm ) { 
            // if there is a search term, open the popover and submit 
            // the search term to the backend
            setIsPopoverOpen( true )

            fetcher.submit( 
                { searchTerm },
                { method: "post" }
            )
        } else {
            // if there is no search term, close the popover
            setIsPopoverOpen( false )
        }
    }

    // handleSearchInputBlur()
    // This function is called when the search input loses focus. It checks 
    // if a search result item was clicked, and if not, it closes the popover 
    // and calls the handleMobileClose function to close the mobile menu if 
    // it's open.
    function handleSearchInputBlur() {
        if ( !isSearchItemClicked ) {
            setIsPopoverOpen( false )
            handleMobileClose()
        }
    }


    // useEffect to perform a search whenever the debounced search 
    // term changes
    useEffect( function() {
        if ( debouncedSearchTerm ) {
            handleUserSearch( debouncedSearchTerm )
        }
    }, [ debouncedSearchTerm ])


    // useEffect to process any new user data obtained from refreshing 
    // the token during the search request by sending it to the 
    // AuthProvider context
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
            {/* Search Input */}
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
                {/* Search Icon */}
                <FaMagnifyingGlass 
                    className='
                        text-gray-800
                    '
                />

                {/* Search Input Field */}
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
                            px-2 md:px-4 lg:px-8
                            text-center
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
                            // map over the search results and render a SearchResultItem 
                            // for each result, passing the necessary props to handle clicking 
                            // on a search result item to close the popover and reset the 
                            // search term
                            <SearchResultItem 
                                key={item.id}
                                imgSource={item.image}
                                name={item.name}
                                id={item.id}
                                onMouseDown={ () => setIsSearchItemClicked( true ) }
                                onClick={ function() {
                                    setTimeout( function() {
                                        setIsSearchItemClicked( false )
                                        setIsPopoverOpen( false )
                                        setSearchTerm("")
                                        handleMobileClose()
                                    }, 200 )
                                }}
                            />
                        )) }
                    </div>
                }
            </div>}
        </div>
    )
}
