import React, { useState } from 'react'
import Network from './Network'
import { useSelector } from 'react-redux'

function Networks() {
    const networks = useSelector(state => state.networks.data)
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