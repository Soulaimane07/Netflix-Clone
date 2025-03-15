import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Gendres from '../../../Components.js/Gendres/Gendres'
import Header from '../../../Components.js/Header/Header'
import Footer from '../../../Components.js/Footer'
import GendresVer from '../../../Components.js/Gendres/GendresVer'
import { GoTop } from '../../../Components.js/Functions'
import { useDispatch, useSelector } from 'react-redux'
import { getMovie } from '../../../Components.js/Redux/Slices/MoviesSlice'

function Movies() {
  GoTop("Movify | Stream Blockbuster Movies")

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMovie())
  }, [dispatch]);
  
  let movies = useSelector(state => state.movies.data)
  let headermovie = useSelector(state => state.movies.headermovie);
  let loadingMovie = useSelector(state => state.movies.loadingMovie);
  

  return (
    <div className=' text-mywhite bg-primary min-h-screen'>
      <Navbar />

      <div className='pb-32'>
        <Header item={headermovie} type={"movie"} loading={loadingMovie} />
        
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