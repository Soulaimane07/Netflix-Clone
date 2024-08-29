import React, { useState } from 'react'
import { GetNetworks } from '../Functions'
import Network from './Network'

function Networks() {
    const networks = GetNetworks()
    const [play, setPlay] = useState(false)

  return (
      <ul className='SCROLL mt-1 px-16 flex space-x-3 overflow-hidden overflow-x-scroll py-6 pt-2 scroll-smooth'>
          {networks?.map((item,key)=>(
              <Network play={play} setPlay={setPlay} item={item} id={key} key={key} />
          ))}    
      </ul>
  )
}

export default Networks