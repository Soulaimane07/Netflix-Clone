import Navbar from '../Navbar/Navbar'
import { GetGendres } from '../../../Components.js/Functions'
import { Link } from 'react-router-dom'
import Footer from '../../../Components.js/Footer'

function Gendres() {
    const gendres = GetGendres()

  return (
    <div className=' bg-primary min-h-screen'>
        <Navbar />

        <div className='text-white pt-14 min-h-screen'>
            <h1 className='GradHeder text-center font-bold text-5xl sticky pt-20 pb-10 top-0 z-10'> Gendres </h1>

            <div className='grid grid-cols-6 px-40 justify-center items-center gap-4 mt-10'>
                {gendres.map((item,key)=>(
                    <Link to={`/gendres/${item.id}`} key={key} className='w-64 hover:bg-blue-500 py-10 items-center text-center hover:scale-105 transition-all bg-gray-400 bg-opacity-25 rounded-md'>
                        <h2 className='font-medium text-lg'> {item.title} </h2>
                    </Link>
                ))}
            </div>
        </div>

      <Footer />
    </div>
  )
}

export default Gendres