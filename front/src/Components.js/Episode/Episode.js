import React from 'react'

function Episode({season, episode}) {
  return (
    <div className='flex items-start space-x-6'>
        <img src="https://netflix-movies-series.s3.eu-west-3.amazonaws.com/series/bg/Miss+Night+and+Day.jpg" className='w-60 rounded-md' alt='' />
        <div className='py-1'>
            <h2 className=' font-medium text-xl mb-3'> S{season} E{episode} - Episode 2 </h2>
            <p className='w-2/3 opacity-60'> Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan. </p>
        </div>
    </div>
  )
}

export default Episode