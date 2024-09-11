import React from 'react'
import { useSelector } from 'react-redux'
import Work from '../../../Components.js/Work/Work'

function Watchlist() {
  const watchlist = useSelector(state => state.profile.watchlist)

  return (
    <div className='mt-20 '>
        <h1 className='text-2xl px-16'> Watch List </h1>
        <ul className=' flex flex-wrap gap-4 px-16 overflow-hidden py-4'>
            {watchlist?.map((item,key)=>(
                <Work item={item} key={key} />
            ))}
        </ul>
    </div>
  )
}

export default Watchlist