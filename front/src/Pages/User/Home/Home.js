import Navbar from '../Navbar/Navbar'
import Header from '../../../Components.js/Header/Header'
import Networks from '../../../Components.js/Networks/Networks';
import Footer from '../../../Components.js/Footer';
import GendresVer from '../../../Components.js/Gendres/GendresVer';
import { GenerateNumber, GetAllGenres, GetRanMovie, GoTop } from '../../../Components.js/Functions';
import { useEffect, useState } from 'react';

function Home() {
    GoTop("Disney+ | More than you'd ever imagine")

    const [num, setNum] = useState(1);
    const [work, setMovie] = useState({});

    useEffect(() => {
      const fetchMovie = async () => {
          let randomId = GenerateNumber(1, 10);
          setNum(randomId);
          let movieData = await GetRanMovie(randomId);

          while (!movieData) {
              randomId = GenerateNumber(1, 10);
              setNum(randomId);
              movieData = await GetRanMovie(randomId);
          }

          setMovie(movieData);
      };

      fetchMovie();
    }, []);
  
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