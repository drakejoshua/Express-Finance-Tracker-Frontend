import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

export default function PercentChangeIndicator({ percentChange, className = "" }) {
    return (
        <span
            className={`
                flex
                items-center
                text-sm
                font-medium
                ${
                    percentChange < 0 ? 
                        'text-red-600 dark:text-red-300' : 
                        'text-green-700 dark:text-green-300'
                }
                ${ className }
            `}
        >
            { percentChange < 0 ? <FaCaretDown /> : <FaCaretUp /> }

            <span>
                { percentChange >= 0 ? `+${percentChange}` : percentChange }%
            </span>
        </span>
    )
}
