import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../../../Components.js/Header/Header'
import Gendres from '../../../Components.js/Gendres/Gendres'
import Footer from '../../../Components.js/Footer'
import GendresVer from '../../../Components.js/Gendres/GendresVer'
import { GetSerie, GetSeriesGenres, GoTop } from '../../../Components.js/Functions'

function Series() {
  GoTop("Disney+ | Watch Hit TV Series")

  let serie = GetSerie(3)
  let series = GetSeriesGenres()


  return (
    <div className=' bg-primary min-h-screen'>
      <Navbar />

      <div className='text-white pb-32'>
        <Header item={serie} type={"serie"} />
        
        <div className='min-h-screen'> 
            <Gendres />
            <GendresVer data={series} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Series