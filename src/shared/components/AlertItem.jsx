import React from 'react'
import { FaArrowDown, FaArrowUp, FaPen, FaTrash } from 'react-icons/fa6'
import Button from './Button'

export default function AlertItem({ imageSrc, title, condition, targetPrice, handleEdit, handleDelete }) {
    return (
        <div
            className="
                flex
                gap-2
                items-center
            "
        >
            <img 
                src={ imageSrc } 
                alt="image of bitcoin" 
                className="
                    w-10
                    h-10
                "
            />

            <div>
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
                            text-red-500
                        "
                    />}
                    
                    { condition == "above" && <FaArrowUp
                        className="
                            text-green-700
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
                    *:text-white
                    *:bg-green-700 *:hover:bg-green-900
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
