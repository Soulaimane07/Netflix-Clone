import React from 'react'
import Work from '../Work/Work'
import { FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function List() {
    const favSeries = useSelector(state => state.profile.favSeries)
    const favMovies = useSelector(state => state.profile.favMovies)

  return (
    favMovies?.length > 0 || favSeries?.length > 0 &&
    <div className='mt-10'>
        <div className='flex ListTitle relative items-center w-full space-x-4 px-16 pb-1 mb-2'>
            <Link to={"/profile"} className='flex space-x-6'>
                <h2 className=' text-2xl font-medium '> Watch List </h2>
                <span className=' transition-all mt-2 text-md text-gray-400 flex items-end'> See more <FaAngleRight className='mb-0.5 ml-1 icon' /> </span>
            </Link>
        </div>
        <ul className='SCROLL mt-1 px-16 flex space-x-3 overflow-hidden overflow-x-scroll py-6 pt-2 scroll-smooth '>
            {favSeries?.map((item,key)=>(
                key < 10 && <Work item={item} key={key} />
            ))}
            {favMovies?.map((item,key)=>(
                key < 10 && <Work item={item} key={key} />
            ))}
        </ul>
    </div>
  )
}

export default List