import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../../../Components.js/Header/Header'
import Networks from '../../../Components.js/Networks/Networks';
import Footer from '../../../Components.js/Footer';
import GendresVer from '../../../Components.js/Gendres/GendresVer';

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
          <GendresVer />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home