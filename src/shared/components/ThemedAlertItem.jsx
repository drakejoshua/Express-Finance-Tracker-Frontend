import { FaArrowDown, FaArrowUp, FaPen, FaTrash } from 'react-icons/fa6'
import Button from './Button.jsx'


export default function ThemedAlertItem({ imageSrc, title, condition, targetPrice, handleEdit, handleDelete }) {
    return (
        <div
            className="
                flex
                gap-3
                items-center
                p-2 px-3
                rounded-lg
                hover:bg-gray-200 dark:hover:bg-gray-800
            "
        >
            <img 
                src={ imageSrc } 
                alt="coin alert image" 
                className="
                    w-10
                    h-10
                "
            />

            <div
                className='
                    dark:text-white
                '
            >
                <span>
                    { title }
                </span>

                <span
                    className="
                        -mt-1  
                        flex
                        gap-1
                        items-center
                    "
                >
                    { condition == "below" && <FaArrowDown
                        className="
                            text-red-500 dark:text-red-300
                        "
                    />}
                    
                    { condition == "above" && <FaArrowUp
                        className="
                            text-green-700 dark:text-green-300
                        "
                    />}

                    <span>
                        { targetPrice }
                    </span>
                </span>
            </div>

            <div
                className="
                    ml-auto
                    flex
                    gap-2
                    items-center
                    *:p-2
                    *:rounded-full
                "
            >
                <Button onClick={handleEdit}>
                    <FaPen/>
                </Button>
                
                <Button onClick={handleDelete}>
                    <FaTrash/>
                </Button>
            </div>
        </div>
    )
}
