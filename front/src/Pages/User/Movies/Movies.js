import React from 'react'
import Navbar from '../Navbar/Navbar'
import Gendres from '../../../Components.js/Gendres/Gendres'
import Header from '../../../Components.js/Header/Header'
import Footer from '../../../Components.js/Footer'
import GendresVer from '../../../Components.js/Gendres/GendresVer'
import { GetMovie, GetMoviesByGendre, GoTop } from '../../../Components.js/Functions'

function Movies() {
  GoTop("Disney+ | Stream Blockbuster Movies")

  let movie = GetMovie(13)
  let GendresWithMovies = GetMoviesByGendre()


  return (
    <div className=' bg-primary min-h-screen'>
      <Navbar />

      <div className='text-white'>
        <Header item={movie} type={"movie"} />
        
        <div className='min-h-screen'> 
            <Gendres />
            <GendresVer data={GendresWithMovies} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Movies