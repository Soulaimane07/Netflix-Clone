import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from './Header'
import { useParams } from 'react-router-dom'
import { GetNetwork } from '../../../Components.js/Functions'
import Footer from '../../../Components.js/Footer'

function Network() {
    let {id} = useParams()

    let network = GetNetwork(id)

  return (
    <div className=' bg-primary min-h-screen'>
        <Navbar />

        <div className='text-white min-h-screen'>
            <Header network={network} />

            <div className='grid h-screen grid-cols-6 px-40 justify-center items-center gap-4 mt-20'>
                
            </div>
        </div>

      <Footer />
    </div>
  )
}

export default Network