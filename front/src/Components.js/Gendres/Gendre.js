import React from 'react'
import { Link } from 'react-router-dom'

function Gendre({item}) {
  return (
    <Link to={`/gendres/${item.id}`} className='w-64 hover:bg-blue-500 hover:scale-105 transition-all bg-gray-400 bg-opacity-25 rounded-md'>
        <h2 className='pb-4 pl-6 pt-16 font-medium text-lg'> {item.title} </h2>
    </Link>
  )
}

export default Gendre