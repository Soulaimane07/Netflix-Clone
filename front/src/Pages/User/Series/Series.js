import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../../../Components.js/Header/Header'
import Gendres from '../../../Components.js/Gendres/Gendres'
import Footer from '../../../Components.js/Footer'
import GendresVer from '../../../Components.js/Gendres/GendresVer'
import { GetSerie, GetSeriesByGendre, GoTop } from '../../../Components.js/Functions'

function Series() {
  GoTop("Disney+ | Watch Hit TV Series")

  let series = GetSerie(3)
  let GendresWithSeries = GetSeriesByGendre()

  console.log(series);


  return (
    <div className=' bg-primary min-h-screen'>
      <Navbar />

      <div className='text-white pb-32'>
        <Header item={series} type={"serie"} />
        
        <div className='min-h-screen'> 
            <Gendres />
            <GendresVer data={GendresWithSeries} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Series