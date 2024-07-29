import Navbar from '../Navbar/Navbar'
import Header from '../../../Components.js/Header/Header'
import Networks from '../../../Components.js/Networks/Networks';
import Footer from '../../../Components.js/Footer';
import GendresVer from '../../../Components.js/Gendres/GendresVer';
import { GetMovie, GetMoviesByGendre, GoTop } from '../../../Components.js/Functions';

function Home() {
  GoTop("Disney+ | More than you'd ever imagine")

  let GendresWithMovies = GetMoviesByGendre()
  let movie = GetMovie(10)


  return (
    <div className=' bg-primary min-h-screen'>
      <Navbar />

      <div className='text-white pb-20'>
        <Header item={movie} />
        
        <div className='min-h-screen'> 
          <Networks />
          <GendresVer data={GendresWithMovies} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home