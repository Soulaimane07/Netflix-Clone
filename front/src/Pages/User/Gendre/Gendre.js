import Navbar from '../Navbar/Navbar'
import { GetGendre, GetMoviesByGenre, GetSeriesByGenre, GoTop } from '../../../Components.js/Functions'
import { useParams } from 'react-router-dom'
import Footer from '../../../Components.js/Footer'
import Work from '../../../Components.js/Work/Work'

function Gendre() {
  GoTop("Disney+ | More than you'd ever imagine")

    let {id} = useParams()
    let gendre = GetGendre(id)

    let movies = GetMoviesByGenre(id)
    let series = GetSeriesByGenre(id)

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
        
        <div className='text-white pt-14 min-h-screen'>
            <h1 className='GradHeder text-center font-bold text-5xl sticky pt-20 pb-10 top-0 z-10 '> {gendre.title} </h1>

            <div className=' grid grid-cols-5 px-44 gap-4 '>
              {works?.map((item,key)=>(
                <Work item={item} key={key} />
              ))} 
            </div>
        </div>

      <Footer />
    </div>
  )
}

export default Gendre