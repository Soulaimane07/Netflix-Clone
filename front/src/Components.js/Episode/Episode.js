import React from 'react'

function Episode({data, season, episode}) {
  return (
    <button className='flex items-start space-x-6 Episode text-left rounded-sm w-auto'>
        <img src={data.cardimage} className='w-60 rounded-md transition-all' alt='' />
        <div className='py-1'>
            <h2 className=' font-medium text-xl mb-3'> S{season} E{episode} - {data.title ? data.title : "Episode " + episode } </h2>
            <p className='w-2/3 opacity-60'> {data.description} </p>
        </div>
    </button>
  )
}

export default Episode