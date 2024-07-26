import React from 'react'
import { Link } from 'react-router-dom'
import Work from '../Work/Work'
import { FaAngleRight } from "react-icons/fa6";

function GendresVer({data}) {
  return (
    <ul className='items-stretch '>
        {data?.map((item,key)=>(
            <div key={key} className='mt-10'>
              <div className='flex ListTitle relative items-center w-full space-x-4 px-16 pb-1 mb-2'>
                <Link to={`/gendres/${item.genre.id}`} className='flex space-x-6'>
                  <h2 className=' text-2xl font-medium '> {item.genre.title} </h2>
                  <span className=' transition-all mt-2 text-md text-gray-400 flex items-end'> See more <FaAngleRight className='mb-0.5 ml-1' /> </span>
                </Link>
              </div>
                <ul className='SCROLL mt-1 px-16 flex space-x-3 overflow-hidden overflow-x-scroll py-6 pt-2 scroll-smooth '>
                    {item.movies.map((item,key)=>(
                      <Work item={item} key={key} />
                    ))}
                </ul>
            </div>
        ))}    
    </ul>
  )
}

export default GendresVer