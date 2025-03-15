import React, { useState } from 'react'
import Header from './Header'
import LikeThis from '../../../Components.js/LikeThis/LikeThis'
import Episodes from './Serie/Episodes'

function Serie({data}) {
  const [tab, setTab] = useState(0)

  const tabs = [
    {
        "title": "Episodes",
    },
    {
        "title": "More Like This",
    },
    {
        "title": "Trailers & More",
    },
  ]

  return (
    <div>
        <Header tab={tab} setTab={setTab} tabs={tabs}  />
      
        <div id='Episodes' className='pt-4'>
          <Episodes serie={data} />
        </div>

        <div id='More%20Like%20This' className='pt-20'>
          <h2 className='mb-4 font-medium text-xl px-16'> Trailers & More </h2>
          <LikeThis />
        </div>

        <div id='Trailers%20&%20More' className='px-16 pt-16'>
          <h2 className='mb-4 font-medium text-xl '> Trailers & More </h2>
          <video src={data?.trailer} controls muted width={400} poster={data?.bgimage} className=' rounded-md' />
          <p className='px-8 mt-2 font-medium text-sm opacity-80'> {data?.title} | Trailer </p>
        </div>
    </div>
  )
}

export default Serie