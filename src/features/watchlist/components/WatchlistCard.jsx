import { FaPen, FaTrash } from "react-icons/fa6";
import Button from "../../../shared/components/Button";
import PercentChangeIndicator from "../../../shared/components/PercentChangeIndicator";
import CoinChart from "../../../shared/components/CoinChart";


export default function WatchlistCard({
    imageSrc,
    name,
    price,
    percentChange,
    handleDelete,
    sparklineData
}) {
    return (
        <div
            className='
                bg-gray-100 dark:bg-gray-700 
                p-6
                rounded-lg
            '
        >
            {/* coin image and name */}
            <div
                className='
                    flex
                    gap-2
                '
            >
                {/* coin image */}
                <img 
                    src={ imageSrc } 
                    alt={ name } 
                    className='
                        w-6
                        h-6
                        object-cover
                    '
                />

                {/* coin name */}
                <span
                    className='
                        capitalize
                        dark:text-white
                    '
                >
                    { name }
                </span>
            </div>

            {/* coin portfolio balance, % balance change, current price */}
            {/* and portfolio controls */}
            <div
                className='
                    flex
                    mt-2
                '
            >
                <div
                    className='
                        flex
                        flex-col
                        gap-1
                        w-3/5
                    '
                >
                    {/* coin current price */}
                    <span
                        className='
                            text-4xl
                            font-medium
                            text-gray-800
                            dark:text-white
                            overflow-hidden
                            text-ellipsis
                            whitespace-nowrap
                        '
                        title={ price }
                    >
                        ${ price }
                    </span>

                    {/* coin % price change */}
                    <PercentChangeIndicator
                        percentChange={ percentChange }
                        className='
                            text-lg
                        '
                    />
                </div>

                <div
                    className='
                        ml-auto
                        flex
                        items-center
                        gap-2
                    '
                >
                    {/* delete button */}
                    <Button
                        className="
                            p-3
                            rounded-full
                            text-xl
                        "
                        onClick={ handleDelete }
                    >
                        <FaTrash />
                    </Button>
                </div>
            </div>

            {/* coin sparkline chart */}
            <div
                className='
                    h-40
                    w-[104%]
                    relative
                    -left-4
                '
            >
                <CoinChart 
                    data={ sparklineData }
                />
            </div>
        </div>
    )
}
