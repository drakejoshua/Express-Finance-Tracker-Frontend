/* 
    SearchResultItem.jsx

    This component represents an individual search result item that can be displayed
    in a search results list. It accepts props for the image source, name, and id of the
    search result item, and uses the Link component from react-router-dom to create a
    clickable link that navigates to a details page for the item when clicked. The component
    also applies styling to display the image and name of the search result item in a 
    visually appealing way.
*/


// import necessary dependencies and components
import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


export default function SearchResultItem({ imgSource, name, id, ...props }) {
    // use the useLocation hook to get the current location object, 
    // which will be used to construct the URL for the target page 
    // when the search result item is clicked
    const location = useLocation()

    return (
        <Link
            className='
                flex
                gap-3
                items-center
                px-3 py-2
                rounded-md
                hover:bg-gray-300
            '
            to={`${location.pathname}/details/${id}`}
            relative='route'
            {...props}
        >
            {/* item image */}
            <img 
                src={imgSource} 
                alt={name}
                className='
                    w-8
                    rounded-full
                '
            />

            {/* item name */}
            <span>
                {name}
            </span>
        </Link>
    )
}
