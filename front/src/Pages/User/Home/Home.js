import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../../../Components.js/Header/Header'

function Home() {
  return (
    <div className=' bg-primary min-h-screen'>
      <Navbar />

      <div className='text-white'>
        <Header />
        <div className='h-screen'> 

        </div>
      </div>
    </div>
  )
}

export default Home