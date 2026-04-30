import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function SearchResultItem({ imgSource, name, id }) {
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
        >
            <img 
                src={imgSource} 
                alt={name}
                className='
                    w-8
                    rounded-full
                '
            />

            <span>
                {name}
            </span>
        </Link>
    )
}
