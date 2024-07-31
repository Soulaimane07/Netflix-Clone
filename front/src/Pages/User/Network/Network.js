import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from './Header'
import { useParams } from 'react-router-dom'
import { GetMoviesByNetwork, GetNetwork, GetSeriesByNetwork, GoTop } from '../../../Components.js/Functions'
import Footer from '../../../Components.js/Footer'
import Work from '../../../Components.js/Work/Work'

function Network() {
   GoTop("Disney+ | The greatest stories, all in one place")

    let {id} = useParams()

    let network = GetNetwork(id)

    let movies = GetMoviesByNetwork(id)
    let series = GetSeriesByNetwork(id)

    let works = []
    const maxLength = Math.max(movies.length, series.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < movies.length) {
        works.push(movies[i]);
      }
      if (i < series.length) {
        works.push(series[i]);
      }
    }

  return (
    <div className=' bg-primary min-h-screen'>
        <Navbar />

        <div className='text-white min-h-screen pb-32'>
            <Header network={network} />

            <div className=' grid grid-cols-4 px-40 gap-4 mt-14'>
              {works?.map((item,key)=>(
                <Work item={item} key={key} />
              ))}    
            </div>
        </div>

      <Footer />
    </div>
  )
}

export default Network