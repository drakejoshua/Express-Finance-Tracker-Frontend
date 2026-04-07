import { Outlet } from "react-router-dom";
import BitcoinGraph from "../../../assets/Design/Bitcoin-Graph.svg"
import EthereumCard from "../../../assets/Design/Ethereum Price Card.svg"
import RippleCard from "../../../assets/Design/Ripple Price Card.svg"
import 'animate.css';

export default function AuthLayout() {
  return (
    <div className="auth-layout h-full xl:grid grid-cols-[1fr_2fr] grid-flow-col">
        <Outlet />

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