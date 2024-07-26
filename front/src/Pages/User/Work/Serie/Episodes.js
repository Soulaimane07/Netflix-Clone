import React, { useState } from 'react'
import Episode from '../../../../Components.js/Episode/Episode';

function Episodes() {
    const seasonsCount = 2;
    const seasons = Array.from({ length: seasonsCount }, (_, index) => index + 1);
    const [seasonId, setSeason] = useState(1)

    const episodesCount = 8
    const episodes = Array.from({ length: episodesCount }, (_, index) => index + 1);

  return (
    <div className='px-16'>
        <ul className='flex items-center space-x-10 mb-8'>
            {seasons.map((season, index) => (
                <button key={index} className={`${seasonId === season ? 'opacity-100' : 'opacity-50'} font-medium transition-all text-lg`} onClick={()=> setSeason(season)}>Season {season} </button>
            ))}
        </ul>

        <div className='min-h-screen space-y-6'>
            {episodes.map((item, index) => (
                <Episode data={item} key={index} season={seasonId} episode={index+1} />
            ))}
        </div>
    </div>
  )
}

export default Episodes