import Navbar from '../Navbar/Navbar'
import Header from '../../../Components.js/Header/Header'
import Networks from '../../../Components.js/Networks/Networks';
import Footer from '../../../Components.js/Footer';
import GendresVer from '../../../Components.js/Gendres/GendresVer';
import { GenerateNumber, GetAllGenres, GetRanMovie, GoTop } from '../../../Components.js/Functions';
import { useEffect, useState } from 'react';
import List from '../../../Components.js/Gendres/List';

function Home() {
    GoTop("Movify | More than you'd ever imagine")

    const [work, setMovie] = useState({});

    useEffect(() => {
      const fetchMovie = async () => {
          let randomId = GenerateNumber(1, 10);
          let movieData = await GetRanMovie(randomId);

          while (!movieData) {
              randomId = GenerateNumber(1, 10);
              movieData = await GetRanMovie(randomId);
          }

          setMovie(movieData);
      };

      fetchMovie();
    }, []);
  
    let works = GetAllGenres()

  return (
    <div className='text-mywhite bg-primary min-h-screen'>
      <Navbar />

      <div className='pb-32'>
        <Header item={work} type={work?.video ? 'movie' : 'serie'} />
        
        <div className='min-h-screen'> 
          <Networks />
          <List />
          <GendresVer data={works} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home