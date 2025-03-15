import React, { useEffect, useState } from 'react';
import Episode from '../../../../Components.js/Episode/Episode';
import { FaAngleDown } from "react-icons/fa6";
import { GetEpisodes } from '../../../../Components.js/Functions';

function Episodes({ serie }) {
    const episodes = GetEpisodes(serie.id); // Fetch episodes based on serie ID
    const [displayEpisodes, setDisplayEpisodes] = useState(10); // Initially display 10 episodes

    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);

    const getSeasons = (episodes) => {
        const seasons = episodes.map((episode) => episode.season);
        return [...new Set(seasons)];
    };

    useEffect(() => {
        if (episodes.length > 0) {
            const uniqueSeasons = getSeasons(episodes);
            setSeasons(uniqueSeasons);
            setSelectedSeason(uniqueSeasons[0]);
        }
    }, [episodes]);

    const filterEpisodesBySeason = (episodes, selectedSeason) => {
        return episodes.filter((episode) => episode.season === selectedSeason);
    };

    return (
        <div className='px-16'>
            <ul className='flex items-center space-x-10 mb-8'>
                {seasons.map((season, index) => (
                    <button
                        key={index}
                        className={`${selectedSeason === season ? 'opacity-100' : 'opacity-50'} font-medium transition-all text-lg`}
                        onClick={() => setSelectedSeason(season)}
                    >
                        Season {index + 1}
                    </button>
                ))}
            </ul>

            <ul className='min-h-screen space-y-6 relative'>
                {selectedSeason && (
                    filterEpisodesBySeason(episodes, selectedSeason).slice(0, displayEpisodes).map((item, index) => (
                        <Episode data={item} key={index} />
                    ))
                )}

                {filterEpisodesBySeason(episodes, selectedSeason).length > displayEpisodes && (
                    <div
                        onClick={() => setDisplayEpisodes(displayEpisodes + 10)} // Show 10 more episodes when clicked
                        className='h-20 z-40 EpisodesGrad absolute bottom-0 left-0 flex justify-center items-end w-1/2'
                    >
                        <button className='bg-gray-400 bg-opacity-25 transition-all hover:scale-105 hover:bg-opacity-40 rounded-full px-6 py-2 flex items-center space-x-2'>
                            <FaAngleDown /> <span> View More </span>
                        </button>
                    </div>
                )}
            </ul>
        </div>
    );
}

export default Episodes;
