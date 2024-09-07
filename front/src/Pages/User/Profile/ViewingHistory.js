import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import WorkViewing from '../../../Components.js/Work/WorkViewing';

function ViewingHistory({profile}) {
    const data = useSelector(state => state.viewingHistory.data)
    const [showFinished, setShowFinished] = useState(false)
  

  return (
    <div className='mt-20 '>
        <div className='flex items-center justify-between'>
            <h1 className='text-2xl px-16'> Viewing History </h1>
            <button onClick={()=> setShowFinished(!showFinished)} className={`mr-16 px-6 py-2 rounded-md transition-all bg-myorange hover:opacity-100 ${showFinished ? ' opacity-100' : 'opacity-50'}`}> Finished </button>
        </div>

        <ul className='flex flex-wrap gap-4 px-16  py-4'>
            {/* {data?.map((item,key)=>(
                (item.userViewingHistory.finished === false || item.userViewingHistory.finished === showFinished) && <WorkViewing finished={item.userViewingHistory.finished} item={item.movie} key={key} />
            ))} */}
        </ul>
    </div>
  )
}

export default ViewingHistory