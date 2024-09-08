import React from 'react'
import Work from '../Work/Work'
import { FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import WorkSkeleton from '../Work/WorkSkeleton'

function List() {
    const favSeries = useSelector(state => state.profile.favSeries)
    const favMovies = useSelector(state => state.profile.favMovies)

    let loading = useSelector(state => state.profile.loading)
    let items = [1,2,3,4,5,6,7,8,9,10]

  return (
    (favMovies?.length > 0 | favSeries?.length > 0 | !loading) &&
        <div className='mt-10'>
            <div className='flex ListTitle relative items-center w-full space-x-4 px-16 pb-1 mb-2'>
                {loading ?
                    <div className='flex space-x-6 animate-pulse'>
                        <div className="text-2xl font-medium  h-2.5 rounded-full bg-gray-700 w-48"></div>
                        <span className=' transition-all mt-2 text-md text-gray-400 flex items-end'></span>
                    </div>
                :
                    <Link to={"/profile"} className='flex space-x-6'>
                        <h2 className=' text-2xl font-medium '> Watch List </h2>
                        <span className=' transition-all mt-2 text-md text-gray-400 flex items-end'> See more <FaAngleRight className='mb-0.5 ml-1 icon' /> </span>
                    </Link>
                }
            </div>
            <ul className='SCROLL mt-1 px-16 flex space-x-3 overflow-hidden overflow-x-scroll py-6 pt-2 scroll-smooth '>
                {loading
                    ?
                        items?.map((key)=>(
                            <WorkSkeleton key={key} />
                        ))
                    :
                        (   
                            <>
                                {favSeries?.map((item,key)=>(
                                    <Work item={item} key={key} />
                                ))}
                                {favMovies?.map((item,key)=>(
                                    <Work item={item} key={key} />
                                ))}
                            </>
                        )
                }
            </ul>
        </div>
  )
}

export default List