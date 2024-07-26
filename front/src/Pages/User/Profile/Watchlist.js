import React from 'react'
import { useSelector } from 'react-redux'
import Work from '../../../Components.js/Work/Work'

function Watchlist() {
  const favSeries = useSelector(state => state.profile.favSeries)

  return (
    <div className='mt-20'>
        <h1 className='text-2xl'> Watch List </h1>
        <ul className='flex flex-row  overflow-x-scroll Scroll space-x-4 py-4 scroll-smooth'>
            {favSeries?.map((item,key)=>(
                <Work item={item} key={key} />
            ))}
        </ul>
    </div>
  )
}

export default Watchlist