import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from './Header'
import { useParams } from 'react-router-dom'
import { GetNetworkWorks, GoTop } from '../../../Components.js/Functions'
import Footer from '../../../Components.js/Footer'
import Work from '../../../Components.js/Work/Work'

function Network() {
   GoTop("Movify | The greatest stories, all in one place")

    let {id} = useParams()
    let network = GetNetworkWorks(id)

  return (
    <div className=' bg-primary min-h-screen'>
        <Navbar />

        <div className='text-white min-h-screen pb-32'>
            <Header network={network.network} />

            <div className=' grid grid-cols-4 px-40 gap-4 mt-14'>
              {network?.movies?.map((item,key)=>(
                <Work item={item} key={key} />
              ))}    
              {network?.series?.map((item,key)=>(
                <Work item={item} key={key} />
              ))}    
            </div>
        </div>

      <Footer />
    </div>
  )
}

export default Network