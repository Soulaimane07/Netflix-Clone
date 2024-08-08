import Navbar from '../Navbar/Navbar'
import Header from '../../../Components.js/Header/Header'
import Networks from '../../../Components.js/Networks/Networks';
import Footer from '../../../Components.js/Footer';
import GendresVer from '../../../Components.js/Gendres/GendresVer';
import { GetMovie, GetMoviesByGendre, GetSeriesByGendre, GoTop } from '../../../Components.js/Functions';

function Home() {
  GoTop("Disney+ | More than you'd ever imagine")

  let GendresWithMovies = GetMoviesByGendre()
  let GendresWithSeries = GetSeriesByGendre()

  let work = GetMovie(1)


  let works = GendresWithMovies

  // console.log(works);
  

  // for (let index = 0; index < GendresWithSeries.length; index++) {
  //   if(GendresWithSeries[index].movies?.length > 0){
  //     works[index].movies = [...GendresWithMovies[index].movies, ...GendresWithSeries[index].movies]
  //   }
  // }



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