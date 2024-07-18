import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../../../Components.js/Header/Header'
import Gendres from '../../../Components.js/Gendres/Gendres'
import Footer from '../../../Components.js/Footer'
import GendresVer from '../../../Components.js/Gendres/GendresVer'

function Series() {
  return (
    <div className=' bg-primary min-h-screen'>
      <Navbar />

      <div className='text-white'>
        <Header />
        <div className='min-h-screen'> 
            <Gendres />
            <GendresVer />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Series