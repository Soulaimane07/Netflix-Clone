import React from 'react'
import { Link } from 'react-router-dom'

function Work({item}) {
  return (
    <li>
        <Link to={`/work/${item.id}`}>
        <div className=' overflow-hidden rounded-md w-72 hover:scale-105 transition-all'>
            <img src={item.cardimage} className='w-full h-full object-cover' />
        </div>
        </Link>
    </li>
  )
}

export default Work