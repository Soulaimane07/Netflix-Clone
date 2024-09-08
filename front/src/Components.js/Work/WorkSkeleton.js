import React from 'react'

function WorkSkeleton() {
  return (
    <li className='animate-pulse'>
        <div className=' overflow-hidden rounded-md w-72 h-40 bg-gray-700 hover:scale-105 transition-all'>
        </div>
    </li>
  )
}

export default WorkSkeleton