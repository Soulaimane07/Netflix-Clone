import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../../../Components.js/Header/Header'

function Home() {
  useEffect(() => {
    document.title = 'Disney+ | Browse';
  }, []);

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