import React from 'react'
import { Outlet } from 'react-router-dom'
import bitcoinImage from '../../../assets/Design/bitcoin.png'
import { FaArrowDown, FaCaretDown, FaPen, FaTrash } from 'react-icons/fa6'
import bitcoinImage from "../../assets/Design/bitcoin.png"

export default function Dashboard() {
    return (
        <div>
            {/* dashboard content */}
            <div>
                {/* greeting */}
                <h1>
                    Welcome, Joshua
                </h1>

                {/* portfolio overview */}
                <div>
                    <h2>
                        Portfolio Overview
                    </h2>

                    {/* portfolio chart */}
                    <div>
                    </div>

                    {/* portfolio stats */}
                    <div>
                        <div>
                            <h3>top gainers</h3>

                            {/* top 3 gainers */}
                            <div>
                                {/* item */}
                                <div>
                                    <img src={ bitcoinImage } alt="bitcoin image" />

                                    <div>
                                        <span>
                                            bitcoin
                                        </span>

                                        <span>
                                            <span>
                                                $28,000
                                            </span>
                                            
                                            <span>
                                                <FaCaretDown />

                                                <span>
                                                    -5.2%
                                                </span>
                                            </span>
                                        </span>
                                    </div>

                                    <span>
                                        -$1,500
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {/* top 3 losers */}
                        <div>
                            <h3>top losers</h3>

                            <div>
                                {/* TODO: add items after styling */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* watchlist overview */}
                <h2>
                    Recent Watchlist & Alerts
                </h2>
                
                <div>
                    {/* watchlist stats */}
                    <div>
                        <h3>top gainers</h3>

                        {/* top 3 gainers */}
                        <div>
                            {/* item */}
                            <div>
                                <img src={ bitcoinImage } alt="bitcoin image" />

                                <div>
                                    <span>
                                        bitcoin
                                    </span>

                                    <span>
                                        $28,000
                                    </span>
                                </div>

                                <span>
                                    <FaCaretDown />

                                    <span>
                                        -5.2%
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* top 3 losers */}
                    <div>
                        <h3>top losers</h3>

                        <div>
                            {/* TODO: add items after styling */}
                        </div>
                    </div>

                    {/* alerts */}
                    <div>
                        {/* alert */}
                        <div
                            className="
                                flex
                                gap-2
                                items-center
                            "
                        >
                            <img 
                                src={ bitcoinImage } 
                                alt="image of bitcoin" 
                                className="
                                    w-10
                                    h-10
                                "
                            />

                            <div>
                                <span
                                    className="
                                        text-lg
                                    "
                                >
                                    Bitcoin Alert
                                </span>

                                <span
                                    className="
                                        -mt-1  
                                        flex
                                        gap-1
                                        items-center
                                    "
                                >
                                    <FaArrowDown
                                        className="
                                            text-red-500
                                        "
                                    />

                                    <span>
                                        $79000
                                    </span>
                                </span>
                            </div>

                            <div
                                className="
                                    ml-auto
                                    flex
                                    gap-2
                                    items-center
                                    *:text-white
                                    *:bg-green-700 *:hover:bg-green-900
                                    *:p-2
                                    *:rounded-full
                                "
                            >
                                <button>
                                    <FaPen/>
                                </button>
                                
                                <button>
                                    <FaTrash/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Outlet />
        </div>
    )
}
