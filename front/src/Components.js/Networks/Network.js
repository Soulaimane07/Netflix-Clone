import React from 'react'
import { Link } from 'react-router-dom'

function Network({item, id, play, setPlay}) {
  return (
    <Link to={`/networks/${item.id}`}>
        <div onMouseEnter={()=> setPlay(id)} onMouseLeave={()=> setPlay(false)} className='bg-gray-400 overflow-hidden hover:shadow-lg shadow-white bg-opacity-25 h-32 hover:scale-105  transition-all rounded-md w-60  flex items-center'>
            {play === id
                ?   <video src={item.videourl} className='h-full w-full object-cover ' autoPlay={true} controls={false} muted={true} loop />
                :   <img src={item.logourl} alt='net' className='w-2/3  mx-auto' />
            }
        </div>
    </Link>
  )
}

export default Network