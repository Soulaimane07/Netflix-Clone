import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../../../Components.js/Header/Header'
import Gendres from '../../../Components.js/Gendres/Gendres'
import Footer from '../../../Components.js/Footer'
import GendresVer from '../../../Components.js/Gendres/GendresVer'
import { GoTop } from '../../../Components.js/Functions'
import { useDispatch, useSelector } from 'react-redux'
import { getSerie } from '../../../Components.js/Redux/Slices/SeriesSlice'

function Series() {
  GoTop("Movify | Watch Hit TV Series")


  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSerie())
  }, [dispatch]);

  let series = useSelector(state => state.series.data)
  let serie = useSelector(state => state.series.serie)
  let loadingSerie = useSelector(state => state.series.loadingSerie)


  return (
    <div className=' text-mywhite bg-primary min-h-screen'>
      <Navbar />

      <div className='pb-32'>
        <Header item={serie} type={"serie"} loading={loadingSerie} />
        
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