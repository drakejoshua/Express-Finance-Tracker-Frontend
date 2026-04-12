import React from 'react'

export default function ItemSkeleton() {
    return (
        <div
            className='
                flex
                gap-3
                items-center
                px-3 py-2
                rounded-lg
            '
        >
            <div
                className='
                    w-10
                    h-10
                    rounded-full
                    skeleton
                    shrink-0
                '
            ></div>

            <div
                className='
                    flex
                    flex-col
                    gap-1.5
                '
            >
                <span
                    className='
                        skeleton
                        h-4
                        w-20
                    '
                ></span>

                <span className='skeleton h-4 w-32'></span>
            </div>

            <span
                className="
                    skeleton
                    h-4
                    w-16
                    ml-auto
                "
            ></span>
        </div>
    )
}
