import Navbar from '../Navbar/Navbar'
import { GetGendreWorks, GoTop } from '../../../Components.js/Functions'
import { useParams } from 'react-router-dom'
import Footer from '../../../Components.js/Footer'
import Work from '../../../Components.js/Work/Work'

function Gendre() {
  GoTop("Movify | More than you'd ever imagine")

    let {id} = useParams()
    let gendre = GetGendreWorks(id)

  return (
    <div className=' bg-primary min-h-screen'>
        <Navbar />
        
        <div className='text-white pt-14 pb-32 min-h-screen'>
            <h1 className='GradHeder text-center font-bold text-5xl sticky pt-20 pb-10 top-0 z-10 '> {gendre?.gendre?.title} </h1>

            <div className=' grid grid-cols-4  px-40 gap-4 '>
              {gendre?.series?.map((item,key)=>(
                <Work item={item} key={key} />
              ))} 
              {gendre?.movies?.map((item,key)=>(
                <Work item={item} key={key} />
              ))} 
            </div>
        </div>

      <Footer />
    </div>
  )
}

export default Gendre