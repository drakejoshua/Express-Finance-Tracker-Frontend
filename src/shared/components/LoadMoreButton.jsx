/* 
    LoadMoreButton.jsx

    This component represents a "Load More" button that can be used to load more 
    items in a list or feed. It accepts a className prop for styling and a 
    handleLoadMore prop, which is a function that will be called when the 
    button is clicked to load more items.
*/


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
