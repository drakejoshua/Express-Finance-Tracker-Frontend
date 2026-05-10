/* 
    PercentChangeIndicator.jsx

    This component is responsible for displaying the percentage change of a coin's price 
    or portfolio balance, along with an up or down caret icon to indicate the direction 
    of the change. it dynamically styles text color based on +ve or -ve change and theme
    
    It accepts two props: 
        - percentChange: which is a number representing the percentage change
        - className: which allows for additional styling to be passed in as a string.
*/


// import component dependencies
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

export default function PercentChangeIndicator({ percentChange, className = "" }) {
    return (
        <span
            className={`
                flex
                items-center
                font-medium
                ${
                    percentChange < 0 ? 
                        'text-red-600 dark:text-red-300' : 
                        'text-green-700 dark:text-green-300'
                }
                ${ className }
            `}
        >
            { 
                percentChange < 0 ? 
                <FaCaretDown 
                    className="
                        text-inherit
                    "
                /> : 
                <FaCaretUp 
                    className="
                        text-inherit
                    "
                /> 
            }

            <span
                className="
                    text-inherit
                "
            >
                { 
                    percentChange >= 0 ? 
                    `+${percentChange.toFixed(2)}` : 
                    percentChange.toFixed(2) 
                }%
            </span>
        </span>
    )
}
