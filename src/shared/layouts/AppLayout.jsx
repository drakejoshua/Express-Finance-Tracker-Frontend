import React, { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Logo from "../../shared/components/Logo";
import { FaBars, FaDoorOpen, FaGear, FaListCheck, FaMagnifyingGlass, FaStar, FaUser, FaWallet } from 'react-icons/fa6';
import ThemeButton from '../components/ThemeButton';
import { Avatar, DropdownMenu, Popover } from 'radix-ui';
import bitcoinImage from "../../assets/Design/bitcoin.png"

export default function AppLayout() {
    const location = useLocation();
    const isMobileOrTablet = window.innerWidth < 1024;
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [ isDesktopPopoverOpen, setIsDesktopPopoverOpen ] = useState(false);
    
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
                    <FaBars />
                </button>

                {/* logo */}
                <Logo 
                    className="
                        h-4.5 lg:h-6
                    "
                />

                {/* mobile search */}
                { isMobileOrTablet && <Popover.Root>
                    <Popover.Trigger asChild>
                        <button
                            className='
                                ml-auto
                                text-gray-800 dark:text-white
                                text-xl
                            '
                        >
                            <FaMagnifyingGlass />
                        </button>
                    </Popover.Trigger>

                    <Popover.Portal>
                        <Popover.Content
                            sideOffset={20}
                            align='end'
                            alignOffset={-20}
                            className='
                                w-screen
                                bg-white
                                px-3
                            '
                        >
                            <Popover.Root>
                                <Popover.Trigger asChild>
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
                                        />
                                    </div>
                                </Popover.Trigger>

                                <Popover.Portal>
                                    <Popover.Content
                                        sideOffset={10}
                                        align='start'
                                        className='
                                            py-3 px-4
                                            rounded-lg
                                            bg-gray-100
                                            w-(--radix-popover-trigger-width)
                                        '
                                    >
                                        <Link
                                            className='
                                                flex
                                                gap-3
                                                items-center
                                                px-3 py-2
                                                rounded-md
                                                hover:bg-gray-300
                                            '
                                            to={`${location.pathname}/details/124`}
                                            relative='route'
                                        >
                                            <img 
                                                src={bitcoinImage} 
                                                alt='bitcoin image'
                                                className='
                                                    w-8
                                                    rounded-full
                                                '
                                            />

                                            <span>
                                                Bitcoin
                                            </span>
                                        </Link>
                                    </Popover.Content>
                                </Popover.Portal>
                            </Popover.Root>
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>}

                {/* search  */}
                { !isMobileOrTablet && <Popover.Root
                    open={isDesktopPopoverOpen}
                    onOpenChange={ (open) => setIsDesktopPopoverOpen(open) }
                    onInteractOutside={ () => setIsDesktopPopoverOpen(false) }
                    onEscapeKeyDown={ () => setIsDesktopPopoverOpen(false) }
                >
                    <Popover.Anchor asChild>
                        <div
                            className='
                                flex
                                gap-4
                                items-center
                                px-5 py-2.5
                                bg-gray-200
                                rounded-lg
                                ml-auto
                                w-1/2
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
                                onFocus={() => setIsDesktopPopoverOpen(true)}
                            />
                        </div>
                    </Popover.Anchor>

                    <Popover.Portal>
                        <Popover.Content
                            sideOffset={10}
                            align='start'
                            onOpenAutoFocus={(e) => e.preventDefault()}
                            className='
                                py-3 px-4
                                rounded-lg
                                bg-gray-100
                                w-(--radix-popover-trigger-width)
                            '
                        >
                            <Link
                                className='
                                    flex
                                    gap-3
                                    items-center
                                    px-3 py-2
                                    rounded-md
                                    hover:bg-gray-300
                                '
                                to={`${location.pathname}/details/124`}
                                relative='route'
                            >
                                <img 
                                    src={bitcoinImage} 
                                    alt='bitcoin image'
                                    className='
                                        w-8
                                        rounded-full
                                    '
                                />

                                <span>
                                    Bitcoin
                                </span>
                            </Link>
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>}

                <ThemeButton 
                    className="
                        lg:ml-auto
                        dark:text-white
                    "
                />

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <Avatar.Root>
                            <Avatar.Image 
                                src={bitcoinImage} 
                                alt='User profile photo'
                                className='
                                    w-8
                                    shrink-0
                                '
                            />
                            <Avatar.Fallback>
                                BTC
                            </Avatar.Fallback>
                        </Avatar.Root>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content
                        sideOffset={10}
                        align='end'
                        className='
                            py-5 px-4
                            rounded-lg
                            bg-gray-100
                        '
                    >
                        {/* dropdown details card */}
                        <div
                            className='
                                flex
                                gap-3
                                items-center
                            '
                        >
                            <Avatar.Root>
                                <Avatar.Image 
                                    src={bitcoinImage} 
                                    alt='User profile photo'
                                    className='
                                        w-10
                                    '
                                />
                                <Avatar.Fallback>
                                    BTC
                                </Avatar.Fallback>
                            </Avatar.Root>

                            <div
                                className='
                                    flex
                                    flex-col
                                '
                            >
                                <span
                                    className='
                                        font-medium
                                    '
                                >
                                    Satoshi Nakamoto
                                </span>

                                <span
                                    className='
                                        text-gray-600
                                    '
                                >
                                    satoshi@bitcoin.com
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
                            <DropdownMenu.Item>
                                <Link to="profile">
                                    <FaUser />
                                    Profile
                                </Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <Link to="portfolio">
                                    <FaWallet />
                                    Portfolio
                                </Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <Link to="logout">
                                    <FaDoorOpen />
                                    Logout
                                </Link>
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
                        z-10
                    `}
                >
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
                        <NavLink
                            to="dashboard"
                        >
                            <FaListCheck className='text-lg shrink-0'/>
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
                                dashboard
                            </span>
                        </NavLink>
                        
                        <NavLink
                            to="portfolio"
                        >
                            <FaWallet 
                                className='text-lg shrink-0'
                            />
                            <span
                                className='
                                    lg:opacity-0
                                    lg:w-0
                                    lg:overflow-hidden
                                    lg:whitespace-nowrap
                                    lg:transition-[width]
                                    lg:duration-300
                                    lg:group-hover:opacity-100
                                    lg:group-hover:w-full
                                '
                            >
                                portfolio
                            </span>
                        </NavLink>
                        
                        <NavLink
                            to="watchlist"
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
                        
                        <NavLink
                            to="profile"
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
                        py-4
                        px-4 lg:px-10 
                        h-full
                        overflow-y-auto
                    '
                >
                <Outlet />
                </main>
            </div>
        </div>
    )
}
