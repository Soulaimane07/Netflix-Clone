import React, { useState } from 'react'
import { GetNetworks } from '../Functions'
import Network from './Network'

function Networks() {
    const networks = GetNetworks()
    const [play, setPlay] = useState(false)

  return (
    <div>
        {/* <Link to="/networks" className='px-16 text-2xl font-medium w-full '> Networks </Link> */}
        <ul className='flex items-stretch space-x-3 px-16 mt-4'>
            {networks?.map((item,key)=>(
                <Network play={play} setPlay={setPlay} item={item} id={key} key={key} />
            ))}    
        </ul>
    </div>
  )
}

export default Networks