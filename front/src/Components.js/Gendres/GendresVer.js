import React from 'react'
import { GetGendres } from '../Functions'
import { Link } from 'react-router-dom'

function GendresVer() {
    let gendres = GetGendres()
    

  return (
    <ul className='items-stretch '>
        {gendres?.map((item,key)=>(
            <div key={key} className='mt-10'>
                <Link to={`/gendres/${item.id}`} className='px-16 text-2xl font-medium w-full '> {item.title} </Link>
                <div className='h-40 mt-2'>
                </div>
            </div>
        ))}    
    </ul>
  )
}

export default GendresVer