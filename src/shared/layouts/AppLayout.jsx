/* 
    AppLayout.jsx

    This is the main layout component for the application, 
    which defines the overall structure and layout of the app. It
    includes a top bar with a logo, search functionality, theme toggle,
    and user profile dropdown, as well as a navigation bar and a main
    content area where different pages will be rendered based on the
    current route. The layout is responsive and adapts to different screen
    sizes, providing a mobile-friendly navigation experience. It also
    uses the useAuthProvider hook to manage user authentication status and
    redirects to the login page if the user is not authenticated.
*/


// import necessary dependencies and components
import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import Logo from "../../shared/components/Logo";
import { FaBars, FaDoorOpen, FaGear, FaListCheck, FaMagnifyingGlass, FaStar, FaUser, FaWallet, FaX } from 'react-icons/fa6';
import ThemeButton from '../components/ThemeButton';
import { Avatar, DropdownMenu } from 'radix-ui';
import SearchResultItem from '../components/SearchResultItem';
import AppSearchView from '../components/AppSearchView';
import UserAvatar from '../components/UserAvatar';
import { useAuthProvider } from '../providers/AuthProvider';


// create a context to hold app-wide data, such as the 
// currency conversion rate, which can be accessed by any 
// component within the app using the useAppData hook
const AppDataContext = React.createContext()

// custom hook to access the app data context, which provides
// access to app-wide data such as the currency conversion rate
export function useAppData() {
    return useContext( AppDataContext )
}



export default function AppLayout() {
    // derive a boolean value to determine if the current device 
    // is a mobile or tablet based on the window width, this might be
    // used to conditionally render certain UI elements or apply 
    // specific styles for mobile and tablet devices
    const isMobileOrTablet = window.innerWidth < 1024;

    // nav menu state to track whether the navigation menu is open or closed
    const [isNavOpen, setIsNavOpen] = useState(false);

    // mobile search menu state to track whether the mobile search menu is open or closed
    const [ isMobileSearchOpen, setIsMobileSearchOpen ] = useState( false )

    // get the navigate function from the useNavigate hook to 
    // programmatically navigate to different routes in the app
    const navigateTo = useNavigate()

    // currency conversion rate state to hold the current conversion 
    // rate for the user's preferred currency against United States Dollar 
    // (USD), which can be used to convert prices and values throughout the app 
    // to the user's preferred currency
    const [ conversionRate, setConversionRate ] = useState( 1 )

    // get the currently logged in user and the logOut function from the 
    // useAuthProvider hook to manage user authentication status and 
    // handle user logout functionality
    const { currentlyLoggedInUser, logOut } = useAuthProvider()
    
    // handleNavLinkClick()
    // This function is called when a navigation link is clicked. 
    // If the current device is a mobile or tablet, it sets the isNavOpen 
    // state to false, which will close the navigation menu. This is useful 
    // for providing a better user experience on smaller screens, where the 
    // navigation menu takes up a significant portion of the screen when open. 
    // it allows the user to focus on the content of the page they navigated 
    // to without having to manually close the menu.
    function handleNavLinkClick() {
        if ( isMobileOrTablet ) {
            setIsNavOpen( false );
        }
    }

    // fetchCurrencyPrices() 
    // This function fetches the current currency conversion rate 
    // for the user's preferred currency against USD from an 
    // external API. It checks if there is a currently logged in user
    //  and retrieves their preferred currency. If the preferred currency is 
    // not USD, it makes a fetch request to the API to get the conversion rate. 
    // If the request is successful, it updates the conversionRate state with the 
    // retrieved conversion rate. If there is an error during the fetch request, 
    // it sets the conversionRate to 1, which means that no conversion will be 
    // applied and prices will be displayed in USD. If the user's preferred currency 
    // is USD, it also sets the conversionRate to 1 since no conversion is needed.
    async function fetchCurrencyPrices() {
        if ( currentlyLoggedInUser.data ) {
            // get the user's preferred currency from their profile data
            const userPreferredCurrency = currentlyLoggedInUser.data.preferred_currency

            // get exchange rate API key from environment variables
            const exchangeRateApiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY

            if ( userPreferredCurrency !== "USD" ) {
                // if the preferred currency is not USD, fetch the conversion 
                // rate from the API
                try {
                    const resp = await fetch(
                        `https://v6.exchangerate-api.com/v6/${ exchangeRateApiKey }/pair/USD/${userPreferredCurrency}`
                    )

                    // if the request is successful, update the conversionRate 
                    // state with the retrieved conversion rate
                    if ( resp.ok ) {
                        const { conversion_rate } = await resp.json()
                        setConversionRate( conversion_rate )
                    }
                } catch {
                    // if there is an error during the fetch request, set the conversionRate
                    // to 1, which means that no conversion will be applied and prices will 
                    // be displayed in USD
                    setConversionRate( 1 )
                }
            } else {
                // if the user's preferred currency is USD, set the conversionRate 
                // to 1 since no conversion is needed
                setConversionRate( 1 )
            }
        }
    }

    // useEffect hook to fetch the currency conversion rate when the component mounts
    // and whenever the currently logged in user changes. It also checks the authentication 
    // status of the user and redirects to the login page if the user is not authenticated.
    useEffect( function() {
        fetchCurrencyPrices()

        if ( 
            currentlyLoggedInUser.status === "error" ||
            currentlyLoggedInUser.status === "logout" ||
            currentlyLoggedInUser.status === "unavailable" 
        ) {
            navigateTo( "/auth/login" )
        }
    }, [ currentlyLoggedInUser ] )

    // conditionally render different UI based on the authentication 
    // status of the user.
    if ( currentlyLoggedInUser.status === "loading" ) {
        // if the authentication status is still loading, render a 
        // loading message or spinner
        return (
            <div>
                loading authentication status...
            </div>
        )
    } else if (
        currentlyLoggedInUser.status !== "error" &&
        currentlyLoggedInUser.status !== "unavailable" &&
        currentlyLoggedInUser.data
    ) {
        // if the user is authenticated and there is user data available, 
        // render the main app layout with the top bar, navigation, and main 
        // content area. 
        return (
            <div
                className='
                    h-full
                    flex
                    flex-col
                '
            >
                {/* top bar */}
                <div
                    className='
                        flex
                        items-center
                        py-4
                        px-4 lg:px-6
                        gap-3 lg:gap-5.5
                        border-b-2
                        border-gray-100 dark:border-gray-700
                        relative
                        top-0
                    '
                >
                    {/* nav toggle */}
                    <button
                        className='
                            block lg:hidden
                            text-xl
                            dark:text-white
                        '
                        onClick={ () => setIsNavOpen( !isNavOpen )}
                    >
                        { isNavOpen && <FaX />}
                        { !isNavOpen && <FaBars />}
                    </button>
    
                    {/* logo */}
                    <Logo 
                        className="
                            h-5 lg:h-6
                        "
                    />
    
                    {/* mobile search */}
                    { isMobileOrTablet && 
                            <button
                                className='
                                    text-gray-800 dark:text-white
                                    text-xl
                                    ml-auto
                                '
                                onClick={ () => setIsMobileSearchOpen( !isMobileSearchOpen ) }
                            >
                                { !isMobileSearchOpen && <FaMagnifyingGlass /> }
                                { isMobileSearchOpen && <FaX />}
                            </button>
    
                    }
    
                    {/* search  */}
                    <AppSearchView 
                        className={`
                            w-9/10 lg:w-1/2 
                            lg:ml-auto
                            absolute lg:relative 
                            ${ isMobileSearchOpen ? "block" : "hidden lg:block" }
                            -bottom-8/10 lg:top-0
                            left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0
                            z-1
                        `}
                        handleMobileClose={ () => { if ( isMobileOrTablet ) setIsMobileSearchOpen( false ) } }
                    />
    
                    {/* theme toggle button */}
                    <ThemeButton 
                        className="
                            lg:ml-auto
                            dark:text-white
                        "
                    />
    
                    {/* user profile dropdown */}
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            {/* user avatar */}
                            <UserAvatar 
                                src={ currentlyLoggedInUser.data.profile_photo }
                                alt="User profile info"
                                fallback={ 
                                    currentlyLoggedInUser.data.name.split(" ")
                                    .map( name => name[0] ).join("") 
                                }
                                className="
                                    w-10
                                    h-10
                                    shrink-0
                                "
                            />
                        </DropdownMenu.Trigger>
    
                        {/* dropdown options */}
                        <DropdownMenu.Content
                            sideOffset={10}
                            align='end'
                            className='
                                py-5 px-4
                                rounded-lg
                                bg-gray-100
                                z-1
                                shadow-md
                                w-60
                            '
                        >
                            {/* dropdown details card */}
                            <div
                                className='
                                    flex
                                    gap-2.5
                                    items-center
                                    w-full
                                '
                            >
                                {/* user avatar */}
                                <UserAvatar 
                                    src={ currentlyLoggedInUser.data.profile_photo }
                                    alt="User profile info"
                                    fallback={
                                        currentlyLoggedInUser.data.name.split(" ")
                                        .map( name => name[0] ).join("") 
                                    }
                                    className="
                                        w-10
                                        h-10
                                        shrink-0
                                    "
                                />
    
                                <div
                                    className='
                                        flex
                                        flex-col
                                        grow
                                        min-w-0
                                    '
                                >
                                    {/* user name */}
                                    <span
                                        className='
                                            font-medium
                                            min-w-0
                                            text-ellipsis
                                            overflow-hidden
                                            whitespace-nowrap
                                        '
                                        title={ currentlyLoggedInUser.data.name }
                                    >
                                        { currentlyLoggedInUser.data.name }
                                    </span>
    
                                    {/* user email */}
                                    <span
                                        className='
                                            text-gray-600
                                            min-w-0
                                            text-ellipsis
                                            overflow-hidden
                                            whitespace-nowrap
                                        '
                                        title={ currentlyLoggedInUser.data.email }
                                    >
                                        { currentlyLoggedInUser.data.email }
                                    </span>
                                </div>
                            </div>
    
                            {/* dropdown links */}
                            <div
                                className='
                                    mt-2
                                    flex
                                    flex-col
                                    *:py-2
                                    *:px-3
                                    *:rounded-md
                                    *:hover:bg-gray-300
                                    [&_a]:flex
                                    [&_a]:gap-2
                                    [&_a]:items-center
                                '
                            >
                                {/* profile link */}
                                <DropdownMenu.Item asChild>
                                    <Link to="profile">
                                        <FaUser />
                                        Profile
                                    </Link>
                                </DropdownMenu.Item>

                                {/* watchlist link */}
                                <DropdownMenu.Item asChild>
                                    <Link to="portfolio">
                                        <FaStar />
                                        Watchlist
                                    </Link>
                                </DropdownMenu.Item>

                                {/* logout link */}
                                <DropdownMenu.Item
                                    onSelect={ () => logOut() }
                                    className='
                                        flex
                                        gap-2
                                        items-center
                                        text-red-700 hover:text-black
                                    '
                                >
                                    <FaDoorOpen />
                                    Logout
                                </DropdownMenu.Item>
                            </div>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>
    
                {/* main content */}
                <div
                    className='
                        block lg:flex
                        grow
                        relative lg:static
                    '
                >
                    {/* nav bar */}
                    <nav
                        className={`
                            lg:px-6
                            lg:py-4
                            ${ !isNavOpen && isMobileOrTablet ? "w-0 p-0" : "w-5/6 md:w-2/5 px-6 py-4"}
                            overflow-hidden
                            lg:w-27
                            lg:hover:w-1/5
                            group
                            transition-all lg:transition-[width]
                            duration-500
                            border-r-2
                            border-gray-100 dark:border-gray-700
                            absolute lg:static
                            bg-white dark:bg-gray-800
                            h-full
                            z-1
                        `}
                    >
                        {/* nav links wrapper */}
                        <div
                            className='
                                flex
                                flex-col
                                gap-1
                                *:flex
                                *:gap-3
                                *:items-center
                                *:capitalize
                                *:dark:text-white
                                *:hover:bg-gray-200 *:hover:dark:text-gray-800
                                [&_>_.active]:bg-green-700
                                [&_>_.active]:text-white
                                *:px-5 *:py-3
                                *:rounded-full
                            '
                        >
                            {/* dashboard link */}
                            <NavLink
                                to="dashboard"
                                onMouseDown={ handleNavLinkClick }
                            >
                                <FaStar className='text-lg shrink-0'/>
                                <span
                                    className='
                                        lg:opacity-0
                                        lg:w-0
                                        lg:overflow-hidden
                                        lg:whitespace-nowrap
                                        lg:transition-[width]
                                        lg:duration-300
                                        lg:group-hover:opacity-100
                                        lg:group-hover:w-auto
                                    '
                                >
                                    watchlist
                                </span>
                            </NavLink>
                            
                            {/* profile link */}
                            <NavLink
                                to="profile"
                                onMouseDown={ handleNavLinkClick }
                            >
                                <FaUser className='text-lg shrink-0'/>
                                <span
                                    className='
                                        lg:opacity-0
                                        lg:w-0
                                        lg:overflow-hidden
                                        lg:whitespace-nowrap
                                        lg:transition-[width]
                                        lg:duration-300
                                        lg:group-hover:opacity-100
                                        lg:group-hover:w-auto
                                    '
                                >
                                    profile
                                </span>
                            </NavLink>
                        </div>
    
                    </nav>
    
                    {/* content */}
                    <main
                        className='
                            grow
                            py-4 pb-8
                            px-4 lg:px-10 
                            h-full
                            overflow-y-auto
                            mt-5
                        '
                    >
                        {/* app data context provider */}
                        <AppDataContext.Provider value={{ conversionRate }}>
                            {/* outlet for nested routes */}
                            <Outlet />
                        </AppDataContext.Provider>
                    </main>
                </div>
            </div>
        )
    }
}
