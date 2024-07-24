import React from 'react'
import { useParams } from 'react-router-dom'
import { GetMovie, GoTop } from '../../../Components.js/Functions';
import Navbar from '../Navbar/Navbar';
import Header from '../../../Components.js/Header/Header';
import Footer from '../../../Components.js/Footer';

function Work() {
  GoTop()

    const {id} = useParams()
    let movie = GetMovie(id)


  return (
    <div className=' bg-primary min-h-screen'>
      <Navbar />

      <div className='text-white'>
        <Header item={movie} />
        <div className='min-h-screen'> 
          <video src={movie.trailer} controls muted className='w-80' />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Work