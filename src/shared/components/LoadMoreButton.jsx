import React from 'react'
import Button from './Button.jsx'
import { FaArrowRotateLeft } from 'react-icons/fa6'

export default function LoadMoreButton({ className, handleLoadMore }) {
    return ( 
        <Button
            className={`
                flex
                gap-2
                items-center
                w-min
                mx-auto
                px-5
                rounded-2xl
                ${ className }
            `}
            onClick={ handleLoadMore }
        >
            <FaArrowRotateLeft
                className='shrink-0'
            />

            <span
                className='
                    whitespace-nowrap
                    capitalize
                '
            >
                load more
            </span>
        </Button>
    )
}
