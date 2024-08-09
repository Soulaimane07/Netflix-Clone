import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Gendres from '../../../Components.js/Gendres/Gendres'
import Header from '../../../Components.js/Header/Header'
import Footer from '../../../Components.js/Footer'
import GendresVer from '../../../Components.js/Gendres/GendresVer'
import { GenerateNumber, GetMoviesGenres, GetRanMovie, GoTop } from '../../../Components.js/Functions'

function Movies() {
  GoTop("Disney+ | Stream Blockbuster Movies")

  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
        let randomId = GenerateNumber(1, 10);
        let movieData = await GetRanMovie(randomId);

        while (!movieData) {
            randomId = GenerateNumber(1, 10);
            movieData = await GetRanMovie(randomId);
        }

        setMovie(movieData);
    };

    fetchMovie();
  }, []);

  let movies = GetMoviesGenres()


  return (
    <div className=' bg-primary min-h-screen'>
      <Navbar />

      <div className='text-white pb-32'>
        <Header item={movie} type={"movie"} />
        
        <div className='min-h-screen'> 
            <Gendres />
            <GendresVer data={movies} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Movies