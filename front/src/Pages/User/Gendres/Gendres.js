import Navbar from '../Navbar/Navbar'
import { GetGendres, GoTop } from '../../../Components.js/Functions'
import { Link } from 'react-router-dom'
import Footer from '../../../Components.js/Footer'
import { useState } from 'react'

function Gendres() {
  GoTop("Disney+ | More than you'd ever imagine")

    const gendres = GetGendres()
    const [hover, setHover] = useState(false)

  return (
    <div className=' bg-primary min-h-screen'>
        <Navbar />

        <div className='text-white pt-14 min-h-screen'>
            <h1 className='GradHeder text-center font-bold text-5xl sticky pt-20 pb-10 top-0 z-10'> Gendres </h1>

            <div className='grid grid-cols-6 px-40 justify-center items-center gap-4 mt-10'>
                {gendres.map((item,key)=>(
                    <Link 
                      className='w-64 h-28 overflow-hidden flex justify-center items-center text-center hover:scale-105 transition-all bg-gray-400 bg-opacity-25 rounded-md'
                      onMouseLeave={()=> setHover(false)}
                      onMouseEnter={()=> setHover(key)} 
                      to={`/gendres/${item.id}`} 
                      key={key} 
                    >
                        {key === hover 
                          ? <img src={item.image} alt='genre' className=' object-cover w-full h-full' />
                          : <h2 className='font-medium text-lg'> {item.title} </h2> 
                        }
                    </Link>
                ))}
            </div>
        </div>

      <Footer />
    </div>
  )
}

export default Gendres