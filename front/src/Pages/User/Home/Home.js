import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../../../Components.js/Header/Header'
import Networks from '../../../Components.js/Networks/Networks';

function Home() {
  useEffect(() => {
    document.title = 'Disney+ | Browse';
  }, []);

  return (
    <div className=' bg-primary min-h-screen'>
      <Navbar />

      <div className='text-white'>
        <Header />
        <div className='min-h-screen'> 
          <Networks />
        </div>
      </div>
    </div>
  )
}

export default Home