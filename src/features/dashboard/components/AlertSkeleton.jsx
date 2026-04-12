import React from 'react'

export default function AlertSkeleton() {
    return (
        <div
            className="
                flex
                gap-3
                items-center
                p-2
                rounded-lg
            "
        >
            <div
                className="
                    w-10
                    h-10
                    skeleton
                    rounded-full
                    shrink-0
                "
            ></div>

            <div
                className='
                    dark:text-white
                    flex
                    flex-col
                    gap-1.5
                '
            >
                <div
                    className='
                        skeleton
                        h-4
                        w-24 lg:w-32
                        shrink
                    '
                ></div>

                <div
                    className='
                        skeleton
                        h-4
                        w-20 lg:w-20
                        shrink
                    '
                ></div>
            </div>

            <div
                className="
                    ml-auto
                    flex
                    gap-2
                    items-center
                    *:rounded-full
                "
            >
                <div
                    className="
                        skeleton
                        h-8
                        w-8
                    "
                ></div>
                
                <div
                    className="
                        skeleton
                        h-8
                        w-8
                    "
                ></div>
            </div>
        </div>
    )
}
