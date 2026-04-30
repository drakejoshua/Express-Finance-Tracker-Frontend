import { useEffect, useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import bitcoinImage from "../../assets/Design/bitcoin.png";
import SearchResultItem from './SearchResultItem'
import useDebounce from '../hooks/useDebounce';
import colors from 'tailwindcss/colors';
import { ScaleLoader } from 'react-spinners'



export default function AppSearchView({ className, ...props }) {
    const [ isPopoverOpen, setIsPopoverOpen ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState("")
    const debouncedSearchTerm = useDebounce( searchTerm )
    const [ isSearchItemClicked, setIsSearchItemClicked ] = useState( false )
    
    function handleUserSearch( searchTerm ) {
        if ( searchTerm ) { 
            setIsPopoverOpen( true ) 
        } else {
            setIsPopoverOpen( false )
        }
    }

    function handleSearchInputBlur() {
        if ( !isSearchItemClicked ) {
            setIsPopoverOpen( false )
        } else {
            alert("search item clicked, can't close input")
        }
    }

    useEffect( function() {
        handleUserSearch( debouncedSearchTerm )
    }, [ debouncedSearchTerm ])


    return (
        <div 
            className={`
                relative 
                top-0 
                ${ className }
            `}
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

            {/* desktop search popover */}
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
                { <div
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
                </div>}

                {/* search result not-found state */}
                { false && <div
                    className='
                        flex
                        gap-3
                        items-center
                        justify-center
                        py-3
                    '
                >
                    No results found for "{ debouncedSearchTerm }"
                </div>}

                {/* search result error state */}
                { false && <div
                    className='
                        flex
                        gap-3
                        items-center
                        justify-center
                        py-3
                    '
                >
                    An error occurred while searching for "{ debouncedSearchTerm }"
                </div>}

                {/* search result list */}
                { false && <div>
                    <SearchResultItem 
                        imgSource={bitcoinImage}
                        name="Bitcoin"
                        id={124}
                        onMouseDown={ () => setIsSearchItemClicked( true ) }
                    />
                    
                    <SearchResultItem 
                        imgSource={bitcoinImage}
                        name="Bitcoin"
                        id={124}
                        onMouseDown={ () => setIsSearchItemClicked( true ) }
                    />
                </div>}
            </div>}
        </div>
    )
}
