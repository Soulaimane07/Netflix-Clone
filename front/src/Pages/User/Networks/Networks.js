import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { GetNetworks, GoTop } from '../../../Components.js/Functions'
import Network from '../../../Components.js/Networks/Network'
import Footer from '../../../Components.js/Footer'

function Networks() {
   GoTop("Disney+ | The greatest stories, all in one place")

    const networks = GetNetworks()
    const [play, setPlay] = useState(false)

  return (
    <div className=' bg-primary min-h-screen'>
        <Navbar />

        <div className='text-white pt-14 min-h-screen'>
            <h1 className='GradHeder text-center font-bold text-5xl sticky pt-20 pb-10 top-0 z-10 '> Networks </h1>

            <div className='grid grid-cols-6 px-40 justify-center items-center gap-4 mt-10'>
                {networks.map((item,key)=>(
                    <Network play={play} setPlay={setPlay} item={item} id={key} key={key} />
                ))}
            </div>
        </div>

      <Footer />
    </div>
  )
}

export default Networks