import React from 'react'
import { Link } from 'react-router-dom'
import Work from '../Work/Work'

function GendresVer({data}) {
  return (
    <ul className='items-stretch '>
        {data?.map((item,key)=>(
            <div key={key} className='mt-10'>
                <Link to={`/gendres/${item.genre.id}`} className='px-16 text-2xl font-medium w-full pb-1 mb-2'> {item.genre.title} </Link>
                <ul className='SCROLL mt-2 px-16 flex space-x-3 overflow-hidden overflow-x-scroll py-6 pt-2 scroll-smooth '>
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