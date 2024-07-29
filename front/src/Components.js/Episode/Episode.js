import React from 'react'

function Episode({season, episode}) {
  return (
    <button className='flex items-start space-x-6 Episode text-left rounded-sm w-auto'>
        <img src="https://netflix-movies-series.s3.eu-west-3.amazonaws.com/series/bg/Miss+Night+and+Day.jpg" className='w-60 rounded-md transition-all' alt='' />
        <div className='py-1'>
            <h2 className=' font-medium text-xl mb-3'> S{season} E{episode} - Episode 2 </h2>
            <p className='w-2/3 opacity-60'> Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan. </p>
        </div>
    </button>
  )
}

export default Episode