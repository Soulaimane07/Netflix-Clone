import Navbar from '../Navbar/Navbar'
import Header from '../../../Components.js/Header/Header'
import Networks from '../../../Components.js/Networks/Networks';
import Footer from '../../../Components.js/Footer';
import GendresVer from '../../../Components.js/Gendres/GendresVer';
import { GetAllGenres, GetMovie, GoTop } from '../../../Components.js/Functions';

function Home() {
  GoTop("Disney+ | More than you'd ever imagine")

  let work = GetMovie(1)
  let works = GetAllGenres()
  

  return (
    <div className=' bg-primary min-h-screen'>
      <Navbar />

      <div className='text-white pb-32'>
        <Header item={work} type={work?.video ? 'movie' : 'serie'} />
        
        <div className='min-h-screen'> 
          <Networks />
          <GendresVer data={works} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home