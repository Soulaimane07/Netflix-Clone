import React from 'react'
import WorkSkeleton from '../Work/WorkSkeleton';

function GendresVerSkeleton() {
    let lists = [1,2]
    let items = [1,2,3,4,5,6,7,8,9,10]

  return (
    <ul className='items-stretch '>
      {lists?.map((key)=>(
            <div key={key} className='mt-10'>
                <div className='flex ListTitle relative items-center w-full space-x-4 px-16 pb-1 mb-2'>
                <div className='flex space-x-6 animate-pulse'>
                    <div className="text-2xl font-medium  h-2.5 rounded-full bg-gray-700 w-48"></div>
                    <span className=' transition-all mt-2 text-md text-gray-400 flex items-end'></span>
                </div>
                </div>
                <ul className='SCROLL mt-1 px-16 flex space-x-3 overflow-hidden overflow-x-scroll py-6 pt-2 scroll-smooth '>
                    {items.map((item,key)=>(
                        <WorkSkeleton item={item} key={key} />
                    ))}
                </ul>
          </div>
        ))}
      </ul>
  )
}

export default GendresVerSkeleton