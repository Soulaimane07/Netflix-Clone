import React from 'react'
import { GetGendres, GetMovies } from '../Functions'
import { Link } from 'react-router-dom'
import Work from '../Work/Work'

function GendresVer() {
    let gendres = GetGendres()
    let movies = GetMovies()
    

  return (
    <ul className='items-stretch '>
        {gendres?.map((item,key)=>(
            <div key={key} className='mt-10'>
                <Link to={`/gendres/${item.id}`} className='px-16 text-2xl font-medium w-full pb-1 mb-2'> {item.title} </Link>
                <ul className='h-40 mt-2 px-16 flex space-x-3'>
                    {movies.map((item,key)=>(
                      <Work item={item} key={key} />
                    ))}
                </ul>
            </div>
        ))}    
    </ul>
  )
}

export default GendresVer