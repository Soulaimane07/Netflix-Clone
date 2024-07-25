import React from 'react'
import { useParams } from 'react-router-dom'
import { GetMovie, GoTop } from '../../../Components.js/Functions';
import Navbar from '../Navbar/Navbar';
import Header from '../../../Components.js/Header/Header';
import Footer from '../../../Components.js/Footer';
import Movie from './Movie';
import Serie from './Serie';

function Work() {
    GoTop()

    const {id} = useParams()
    let work = GetMovie(id)

    console.log(work);

  return (
    <div className=' bg-primary min-h-screen'>
      <Navbar />

      <div className='text-white'>
        <Header item={work} />

        <div className='pb-48'> 
          <Movie data={work} />
          {/* <Serie data={movie} /> */}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Work