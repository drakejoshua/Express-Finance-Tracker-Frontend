import React from 'react'
import { FaArrowDown, FaArrowUp, FaPen, FaTrash } from 'react-icons/fa6'
import Button from './Button'

export default function AlertItem({ imageSrc, title, condition, targetPrice, handleEdit, handleDelete }) {
    return (
        <div
            className="
                flex
                gap-3
                items-center
                hover:bg-gray-200
                p-2 px-2.5
                rounded-lg
                cursor-pointer
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

            <div
                className='
                    min-w-0
                '
            >
                <span
                    className='
                        text-ellipsis
                        overflow-hidden
                        whitespace-nowrap
                        block
                    '
                    title={title}
                >
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

                    <span
                        className='
                            text-ellipsis
                            overflow-hidden
                            whitespace-nowrap
                            block
                        '
                        title={targetPrice}
                    >
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
