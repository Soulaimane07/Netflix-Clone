import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from './Header'
import { useParams } from 'react-router-dom'
import { GetMoviesByNetwork, GetNetwork, GoTop } from '../../../Components.js/Functions'
import Footer from '../../../Components.js/Footer'
import Work from '../../../Components.js/Work/Work'

function Network() {
  GoTop()

    let {id} = useParams()

    let network = GetNetwork(id)
    let movies = GetMoviesByNetwork(id)

  return (
    <div className=' bg-primary min-h-screen'>
        <Navbar />

        <div className='text-white min-h-screen pb-40'>
            <Header network={network} />

            <div className=' grid grid-cols-5 px-44 gap-4 mt-14'>
              {movies?.map((item,key)=>(
                <Work item={item} key={key} />
              ))}    
            </div>
        </div>

      <Footer />
    </div>
  )
}

export default Network