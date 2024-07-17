import React, { useState } from 'react'
import { GetNetworks } from '../Functions'
import { Link } from 'react-router-dom'

function Networks() {
    const networks = GetNetworks()
    const [play, setPlay] = useState(false)

  return (
    <div>
        <Link to="/networks" className='px-16 text-2xl font-medium w-full '> Networks </Link>
        <ul className='flex items-stretch space-x-3 px-16 mt-4'>
            {networks?.map((item,key)=>(
                <Link to={`/networks/${item.id}`} key={key}>
                    <div onMouseEnter={()=> setPlay(key)} onMouseLeave={()=> setPlay(false)} className='bg-gray-400 hover:shadow-lg shadow-white bg-opacity-25 h-32 hover:scale-105  transition-all rounded-md w-60  flex items-center'>
                        {play === key
                            ?   <video src={item.videourl} className='h-full w-full object-cover ' autoPlay={true} controls={false} muted={true} loop />
                            :   <img src={item.logourl} alt='net' className='w-2/3  mx-auto' />
                        }
                    </div>
                </Link>
            ))}    
        </ul>
    </div>
  )
}

export default Networks