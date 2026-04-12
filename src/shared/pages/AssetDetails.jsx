import { Dialog, ToggleGroup } from "radix-ui"
import { 
    FaArrowDown, 
    FaArrowRotateLeft, 
    FaBell, 
    FaCaretDown, 
    FaPen, 
    FaPlus, 
    FaStar, 
    FaTrash, 
    FaTriangleExclamation, 
    FaXmark
} from "react-icons/fa6"
import bitcoinImage from "../../assets/Design/bitcoin.png"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import AltButton from "../components/AltButton"
import AlertItem from "../components/AlertItem"
import RouteError from "../components/RouteError"

export default function AssetDetails() {
    const navigateTo = useNavigate()

    return (
        <Dialog.Root 
            defaultOpen={true}
            onOpenChange={ () => { 
                if ( window.history.length > 2 ) {
                    navigateTo( -1 )
                } else {
                    navigateTo( "/" )
                }
            }}
        >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/75" />

                <Dialog.Content
                    className="
                        absolute
                        top-1/2
                        left-1/2
                        -translate-1/2
                        w-9/10
                        max-w-250
                        max-h-[85vh]
                        bg-white
                        rounded-xl
                        overflow-auto
                    "
                >
                    {/* dialog loaded state */}
                    { true && <div>
                        {/* dialog header */}
                        <div 
                            className="
                                flex
                                p-6
                                pt-14
                                gap-3 gap-y-5 lg:gap-5
                                items-center
                                border-b-2
                                border-gray-300 
                                flex-wrap
                                justify-start
                            "
                        >
                            {/* asset image */}
                            <img 
                                src={ bitcoinImage } 
                                alt="Bitcoin" 
                                className="
                                    w-15 lg:w-20
                                    h-15 lg:h-20
                                    object-cover
                                "
                            />

                            {/* asset name, price and % change */}
                            <div>
                                <Dialog.Title
                                    className="
                                        text-2xl
                                    "
                                >
                                    Bitcoin
                                </Dialog.Title>

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    <span
                                        className="
                                            text-xl
                                        "
                                    >
                                        $79,999
                                    </span>

                                    <span
                                        className="
                                            flex
                                            items-center
                                            text-red-600
                                        "
                                    >
                                        <FaCaretDown/>

                                        <span>-1.2%</span>
                                    </span>
                                </div>
                            </div>

                            {/* dialog actions */}
                            <div
                                className="
                                    md:ml-auto
                                    flex
                                    items-center
                                    gap-3
                                    *:p-3
                                    *:bg-green-700 *:hover:bg-green-900 
                                    *:rounded-full
                                    *:text-white
                                    *:text-xl
                                    *:focus:outline-none
                                "
                            >
                                <Button
                                    className="
                                        p-4
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <FaBell/>
                                </Button>

                               <Button
                                    className="
                                        p-4
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <FaStar/>
                                </Button>
                                
                                <Button
                                    className="
                                        p-4
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <FaPlus/>
                                </Button>
                            </div>
                        </div>

                        {/* dialog content */}
                        <div
                            className="
                                p-6
                                grid
                                grid-cols-1fr lg:grid-cols-[2fr_1fr]
                            "
                        >
                            {/* asset details and chart */}
                            <div
                                className="
                                    lg:pr-8    
                                "
                            >
                                {/* asset chart container */}
                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-4
                                        items-center
                                    "
                                >
                                    {/* chart */}
                                    <div
                                        className="
                                            h-80 lg:h-50
                                            bg-green-100
                                            rounded-xl
                                            w-full
                                        "
                                    >
                                        chart
                                    </div>

                                    {/* chart toggle */}
                                    <ToggleGroup.Root 
                                        type="single" 
                                        defaultValue={"7D"}
                                        className="
                                            flex
                                            items-center
                                            gap-4
                                            flex-wrap
                                            justify-center
                                        "
                                    >
                                        {["1D","7D","1M","3M","6M","1Y"].map((value) => (
                                            <ToggleGroup.Item
                                                key={value}
                                                value={value}
                                                className="
                                                    py-1 
                                                    px-3 
                                                    rounded-xl 
                                                    text-sm
                                                    bg-green-100
                                                    data-[state=on]:bg-green-700
                                                    data-[state=on]:text-white
                                                "
                                            >
                                                {value}
                                            </ToggleGroup.Item>
                                        ))}
                                    </ToggleGroup.Root>
                                </div>

                                {/* asset details */}
                                <p
                                    className="
                                        mt-6
                                    "
                                >
                                    bitcoin is the largest cryptocurrency in the world by market cap, daily transaction
                                    volume and other metrics. it was founded by satoshi nakamoto when he wanted to 
                                    created a decentralized way of sending money.
                                    
                                    bitcoin is the largest cryptocurrency in the world by market cap, daily transaction
                                    volume and other metrics. it was founded by satoshi nakamoto when he wanted to 
                                    created a decentralized way of sending money.
                                </p>
                            </div>

                            {/* portfolio details and alerts */}
                            <div
                                className="
                                    mt-8 lg:mt-0
                                "
                            >
                                {/* portfolio details */}
                                <div>
                                    <h2
                                        className="
                                            text-xl
                                            capitalize
                                        "
                                    > 
                                        your portfolio 
                                    </h2>

                                    <div
                                        className="
                                            mt-4
                                            flex
                                            flex-col
                                            capitalize
                                        "
                                    >
                                        <span>number of bitcoin(s): 10</span>
                                        <span>amount in portfolio: $100</span>
                                        <span>total gain/loss(s): -$10</span>
                                    </div>

                                    <div
                                        className="
                                            mt-4
                                            flex
                                            gap-2
                                            flex-wrap
                                            items-center
                                            *:flex
                                            *:gap-2
                                            *:items-center
                                            *:bg-green-700 *:hover:bg-green-900
                                            *:text-white
                                            *:text-sm
                                            *:capitalize
                                            *:px-4 *:py-2
                                            *:rounded-full
                                        "
                                    >
                                        <Button
                                            className="
                                                w-min
                                                flex

                                            "
                                        >
                                            <FaPen />
                                            <span
                                                className="
                                                    w-min
                                                    whitespace-nowrap
                                                "
                                            >
                                                edit portfolio
                                            </span>
                                        </Button>
                                        
                                        <AltButton
                                            className="
                                                w-min
                                                flex
                                                gap-2
                                                items-center
                                            "
                                        >
                                            <FaTrash />
                                            <span
                                                className="
                                                    w-min
                                                    whitespace-nowrap
                                                "
                                            >
                                                remove asset
                                            </span>
                                        </AltButton>
                                    </div>
                                </div>
                                
                                {/* alerts for assets */}
                                <div
                                    className="
                                        mt-6
                                    "
                                >
                                    <h2
                                        className="
                                            capitalize
                                            text-xl
                                        "
                                    > 
                                        alerts 
                                    </h2>

                                    {/* alerts list */}
                                    <div
                                        className="
                                            mt-4
                                            flex
                                            flex-col
                                            gap-2.5
                                        "
                                    >
                                        {/* alert */}
                                        <AlertItem 
                                            imageSrc={ bitcoinImage }
                                            title="Bitcoin Alert"
                                            condition="below"
                                            targetPrice="$79,000"
                                            handleEdit={ () => {} }
                                            handleDelete={ () => {} }
                                        />
                                        
                                        <AlertItem 
                                            imageSrc={ bitcoinImage }
                                            title="Bitcoin Alert"
                                            condition="above"
                                            targetPrice="$79,000"
                                            handleEdit={ () => {} }
                                            handleDelete={ () => {} }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                    
                    {/* dialog loading state */}
                    { false && <div>
                        {/* dialog header */}
                        <div 
                            className="
                                flex
                                p-6
                                pt-14
                                gap-3 gap-y-5 lg:gap-5
                                items-center
                                border-b-2
                                border-gray-300 
                                flex-wrap
                                justify-start
                            "
                        >
                            {/* image loading placeholder */}
                            <div
                                className="
                                    w-15 lg:w-20
                                    h-15 lg:h-20
                                    skeleton
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                            </div>

                            {/* asset name, price and % change loading placeholder */}
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-2
                                "
                            >
                                <div
                                    className="
                                        skeleton
                                        w-32
                                        h-6
                                        rounded
                                    "
                                ></div>

                                <div
                                    className="
                                        skeleton
                                        w-32
                                        h-6
                                        rounded
                                    "
                                ></div>
                            </div>

                            {/* dialog actions */}
                            <div
                                className="
                                    md:ml-auto
                                    flex
                                    items-center
                                    gap-3
                                    *:w-12
                                    *:h-12
                                    *:rounded-full
                                "
                            >
                                <div
                                    className="
                                        skeleton
                                    "
                                ></div>
                                
                                <div
                                    className="
                                        skeleton
                                    "
                                ></div>
                                
                                <div
                                    className="
                                        skeleton
                                    "
                                ></div>
                            </div>
                        </div>

                        {/* dialog content */}
                        <div
                            className="
                                p-6
                                grid
                                grid-cols-1fr lg:grid-cols-[2fr_1fr]
                            "
                        >
                            {/* asset details and chart */}
                            <div
                                className="
                                    lg:pr-8    
                                "
                            >
                                {/* asset chart area loading placeholder */}
                                <div
                                    className="
                                        skeleton
                                        h-70
                                        rounded-xl
                                    "
                                ></div>

                                {/* asset details loading placeholder */}
                                <div
                                    className="
                                        mt-4
                                        flex
                                        flex-col
                                        gap-2
                                    "
                                >
                                    <div
                                        className="
                                            skeleton
                                            w-full
                                            h-6
                                            rounded
                                        "
                                    ></div>

                                    <div
                                        className="
                                            skeleton
                                            w-7/8
                                            h-6
                                            rounded
                                        "
                                    ></div>

                                    <div
                                        className="
                                            skeleton
                                            w-3/4
                                            h-6
                                            rounded
                                        "
                                    ></div>
                                    
                                    <div
                                        className="
                                            skeleton
                                            w-2/3
                                            h-6
                                            rounded
                                        "
                                    ></div>
                                </div>
                            </div>

                            {/* portfolio details and alerts */}
                            <div
                                className="
                                    mt-8 lg:mt-0
                                "
                            >
                                {/* portfolio details */}
                                <div>
                                    <h2
                                        className="
                                            text-xl
                                            capitalize
                                        "
                                    > 
                                        your portfolio 
                                    </h2>

                                    {/* portfolio details loading placeholder */}
                                    <div
                                        className="
                                            mt-4
                                            flex
                                            flex-col
                                            gap-2
                                            *:w-2/3
                                            *:h-4
                                            *:rounded
                                        "
                                    >
                                        <div
                                            className="
                                                skeleton
                                            "
                                        ></div>
                                        
                                        <div
                                            className="
                                                skeleton
                                            "
                                        ></div>
                                        
                                        <div
                                            className="
                                                skeleton
                                            "
                                        ></div>
                                    </div>
                                </div>
                                
                                {/* alerts for assets */}
                                <div
                                    className="
                                        mt-6
                                    "
                                >
                                    <h2
                                        className="
                                            capitalize
                                            text-xl
                                        "
                                    > 
                                        alerts 
                                    </h2>

                                    {/* alerts list */}
                                    <div
                                        className="
                                            mt-4
                                            flex
                                            flex-col
                                            gap-4.5
                                        "
                                    >
                                        {/* alert */}
                                        <div
                                            className="
                                                flex
                                                gap-2
                                                items-center
                                            "
                                        >
                                            {/* alert image loading placeholder */}
                                            <div
                                                className="
                                                    w-10
                                                    h-10
                                                    skeleton
                                                    rounded-full
                                                "
                                            ></div>

                                            {/* alert content loading placeholder */}
                                            <div>
                                                <div
                                                    className="
                                                        skeleton
                                                        w-24
                                                        h-4
                                                        rounded
                                                    "
                                                ></div>
                                                
                                                <div
                                                    className="
                                                        skeleton
                                                        mt-1.5
                                                        w-24
                                                        h-4
                                                        rounded
                                                    "
                                                ></div>
                                            </div>

                                            <div
                                                className="
                                                    ml-auto
                                                    flex
                                                    gap-2
                                                    items-center
                                                    *:p-4
                                                    *:rounded-full
                                                "
                                            >
                                                <div
                                                    className="
                                                        skeleton
                                                    "
                                                ></div>
                                                
                                                <div
                                                    className="
                                                        skeleton
                                                    "
                                                ></div>
                                            </div>
                                        </div>
                                        
                                        <div
                                            className="
                                                flex
                                                gap-2
                                                items-center
                                            "
                                        >
                                            {/* alert image loading placeholder */}
                                            <div
                                                className="
                                                    w-10
                                                    h-10
                                                    skeleton
                                                    rounded-full
                                                "
                                            ></div>

                                            {/* alert content loading placeholder */}
                                            <div>
                                                <div
                                                    className="
                                                        skeleton
                                                        w-24
                                                        h-4
                                                        rounded
                                                    "
                                                ></div>
                                                
                                                <div
                                                    className="
                                                        skeleton
                                                        mt-1.5
                                                        w-24
                                                        h-4
                                                        rounded
                                                    "
                                                ></div>
                                            </div>

                                            <div
                                                className="
                                                    ml-auto
                                                    flex
                                                    gap-2
                                                    items-center
                                                    *:p-4
                                                    *:rounded-full
                                                "
                                            >
                                                <div
                                                    className="
                                                        skeleton
                                                    "
                                                ></div>
                                                
                                                <div
                                                    className="
                                                        skeleton
                                                    "
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}

                    {/* dialog error state */}
                    { false && <RouteError 
                        title="Error loading asset details"
                        message="There was an error loading the details for this cryptocurrency. Please try again later."
                        handleRetry={() => {}}
                    />}

                    <Dialog.Close
                        className="
                            bg-gray-700 hover:bg-gray-900
                            text-white
                            text-xl
                            fixed
                            right-3
                            top-3
                            p-2
                            rounded-full
                        "
                    >
                        <FaXmark/>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
