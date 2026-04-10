import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Logo from "../../shared/components/Logo";
import { FaBars, FaGear, FaListCheck, FaMagnifyingGlass, FaStar, FaUser, FaWallet } from 'react-icons/fa6';
import ThemeButton from '../components/ThemeButton';
import { Avatar, DropdownMenu } from 'radix-ui';
import bitcoinImage from "../../assets/Design/bitcoin.png"

export default function AppLayout() {
  return (
    <div>
      {/* top bar */}
      <div>
        {/* nav toggle */}
        <button>
          <FaBars />
        </button>

        {/* logo */}
        <Logo />

        {/* search  */}
        <div>
            <FaMagnifyingGlass />
            <input type="text" placeholder='Search...' />
        </div>

        <ThemeButton />

        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Avatar.Root>
                    <Avatar.Image src={bitcoinImage} alt='User profile photo'/>
                    <Avatar.Fallback>
                        BTC
                    </Avatar.Fallback>
                </Avatar.Root>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
                {/* dropdown details card */}
                <div>
                    <Avatar.Root>
                        <Avatar.Image src={bitcoinImage} alt='User profile photo'/>
                        <Avatar.Fallback>
                            BTC
                        </Avatar.Fallback>
                    </Avatar.Root>

                    <div>
                        <span>
                            Satoshi Nakamoto
                        </span>

                        <span>
                            satoshi@bitcoin.com
                        </span>
                    </div>
                </div>

                {/* dropdown links */}
                <div>
                    <DropdownMenu.Item>Profile</DropdownMenu.Item>
                    <DropdownMenu.Item>Settings</DropdownMenu.Item>
                    <DropdownMenu.Item>Logout</DropdownMenu.Item>
                </div>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      {/* main content */}
      <div>
        {/* nav bar */}
        <nav>
            <div>
                <NavLink>
                    <FaListCheck />
                    <span>
                        dashboard
                    </span>
                </NavLink>
                
                <NavLink>
                    <FaWallet />
                    <span>
                        portfolio
                    </span>
                </NavLink>
                
                <NavLink>
                    <FaStar />
                    <span>
                        watchlist
                    </span>
                </NavLink>
                
                <NavLink>
                    <FaUser />
                    <span>
                        profile
                    </span>
                </NavLink>
            </div>

        </nav>

        {/* content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
