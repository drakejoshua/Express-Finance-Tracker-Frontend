import { Outlet } from "react-router-dom";
import BitcoinGraph from "../../../assets/Design/Bitcoin-Graph.svg"
import EthereumCard from "../../../assets/Design/Ethereum Price Card.svg"
import RippleCard from "../../../assets/Design/Ripple Price Card.svg"
import 'animate.css';
import ThemeButton from "../../../shared/components/ThemeButton";
import Logo from "../../../shared/components/Logo";

export default function AuthLayout() {
  return (
    <div className="auth-layout h-full xl:grid grid-cols-[1fr_2fr] grid-flow-col">
        <div
            className='
                h-full
                p-6 lg:p-8
                pt-20 lg:pt-14
                w-full
                max-w-100 md:max-w-120 xl:max-w-max
                mx-auto
                relative
                overflow-auto
                *:text-gray-800 dark:*:text-white
            '
        >
            <Logo
                className="
                    w-44 lg:w-40
                    h-auto
                "
            />

            <Outlet />

            {/* theme toggle button */}
            <ThemeButton
                className="
                    absolute
                    top-8
                    right-6
                "
            />
        </div>

        <div 
            className="
                bg-[url('/public/AuthBg.jpg')] bg-cover relative hidden lg:block
                overflow-hidden
            "
        >
            <img 
                src={BitcoinGraph} 
                alt="Bitcoin Graph" 
                className="
                    absolute
                    left-20
                    bottom-14
                    scale-125
                    rounded-lg
                    bitcoin-graph
                    animate__animated animate__pulse animate__infinite animate__slow animate__delay-1s
                " 
            />
            <img 
                src={EthereumCard} 
                alt="Ethereum Card" 
                className="
                    ethereum-card
                    absolute
                    right-10
                    top-10
                    rounded-lg
                " 
            />
            <img 
                src={RippleCard} 
                alt="Ripple Card" 
                className="
                    ripple-card
                    absolute
                    right-16
                    top-32
                    rounded-lg
                " 
            />
        </div>
    </div>
  )
}