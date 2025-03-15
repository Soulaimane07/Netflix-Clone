import React from 'react'
import { GetMovies } from '../Functions'
import Work from '../Work/Work'

function LikeThis() {
    let movies = GetMovies()

  return (
    <ul className='SCROLL mt-2 px-16 flex space-x-3 overflow-hidden overflow-x-scroll py-6 pt-2 scroll-smooth '>
        {movies.map((item,key)=>(
            <Work item={item} key={key} />
        ))}
    </ul>
  )
}

export default LikeThis