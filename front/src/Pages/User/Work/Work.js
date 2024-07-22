import React from 'react'
import { useParams } from 'react-router-dom'
import { GetMovie } from '../../../Components.js/Functions';
import Navbar from '../Navbar/Navbar';
import Header from '../../../Components.js/Header/Header';
import Footer from '../../../Components.js/Footer';

function Work() {
    const {id} = useParams()
    console.log(id);

    let movie = GetMovie(id)
    console.log(movie);

  return (
    <div className=' bg-primary min-h-screen'>
      <Navbar />

      <div className='text-white'>
        <Header item={movie} />
        <div className='min-h-screen'> 
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Work