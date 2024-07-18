import React from 'react'
import Navbar from '../Navbar/Navbar'
import { GetGendre } from '../../../Components.js/Functions'
import { useParams } from 'react-router-dom'
import Footer from '../../../Components.js/Footer'

function Gendre() {
    let {id} = useParams()
    let gendre = GetGendre(id)

  return (
    <div className=' bg-primary min-h-screen'>
        <Navbar />
        
        <div className='text-white pt-14 min-h-screen'>
            <h1 className='GradHeder text-center font-bold text-5xl sticky pt-20 pb-10 top-0 z-10 '> {gendre.title} </h1>

            <div className='grid grid-cols-6 px-40 justify-center items-center gap-4 mt-10'>
            </div>
        </div>

      <Footer />
    </div>
  )
}

export default Gendre