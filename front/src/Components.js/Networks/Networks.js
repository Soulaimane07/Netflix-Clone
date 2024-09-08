import React, { useState } from 'react'
import Network from './Network'
import { useSelector } from 'react-redux'
import WorkSkeleton from '../Work/WorkSkeleton'

function Networks() {
    const networks = useSelector(state => state.networks.data)
    const loading = useSelector(state => state.networks.loading)
    
    const [play, setPlay] = useState(false)

    let items = [1,2,3,4,5,6,7,8,9,10]

  return (
      <ul className='SCROLL mt-1 px-16 flex space-x-3 overflow-hidden overflow-x-scroll py-6 pt-2 scroll-smooth'>
        {loading
            ?
                items?.map((key)=>(
                    <WorkSkeleton key={key} />
                ))
            :
                networks?.map((item,key)=>(
                    <Network play={play} setPlay={setPlay} item={item} id={key} key={key} />
                ))
        }    
      </ul>
  )
}

export default Networks