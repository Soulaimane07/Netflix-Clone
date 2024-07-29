import React, { useState } from 'react'
import Episode from '../../../../Components.js/Episode/Episode';
import { FaAngleDown } from "react-icons/fa6";

function Episodes() {
    const seasonsCount = 2;
    const seasons = Array.from({ length: seasonsCount }, (_, index) => index + 1);
    const [seasonId, setSeason] = useState(1)

    const episodesCount = 8
    const episodes = Array.from({ length: episodesCount }, (_, index) => index + 1);

    const [displayEpisodes, setDispayEpisodes] = useState(10)

  return (
    <div className='px-16'>
        <ul className='flex items-center space-x-10 mb-8'>
            {seasons.map((season, index) => (
                <button key={index} className={`${seasonId === season ? 'opacity-100' : 'opacity-50'} font-medium transition-all text-lg`} onClick={()=> setSeason(season)}>Season {season} </button>
            ))}
        </ul>

        <ul className='min-h-screen space-y-6 relative'>
            {episodes.map((item, index) => (
                index < displayEpisodes && <Episode data={item} key={index} season={seasonId} episode={index+1} />
            ))}

            {episodes?.length > 10 && displayEpisodes !== episodes?.length && 
                <div onClick={()=> setDispayEpisodes(episodes?.length)} className='h-20 z-40 EpisodesGrad absolute bottom-0 left-0 flex justify-center items-end w-1/2'>
                    <button className=' bg-gray-400 bg-opacity-25 transition-all hover:scale-105 hover:bg-opacity-40 rounded-full px-6 py-2 text- flex items-center space-x-2'> <FaAngleDown /> <span> View More </span> </button>
                </div>
            }
        </ul>

    </div>
  )
}

export default Episodes