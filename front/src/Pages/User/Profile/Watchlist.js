import React from 'react'
import { useSelector } from 'react-redux'
import Work from '../../../Components.js/Work/Work'

function Watchlist() {
  const favSeries = useSelector(state => state.profile.favSeries)
  const favMovies = useSelector(state => state.profile.favMovies)

  return (
    <div className='mt-20 '>
        <h1 className='text-2xl px-16'> Watch List </h1>
        <ul className='flex flex-row px-16 overflow-x-scroll Scroll space-x-4 py-4 scroll-smooth'>
            {favSeries?.map((item,key)=>(
                <Work item={item} key={key} />
            ))}
            {favMovies?.map((item,key)=>(
                <Work item={item} key={key} />
            ))}
        </ul>
    </div>
  )
}

export default Watchlist