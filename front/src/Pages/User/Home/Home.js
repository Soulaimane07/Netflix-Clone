import Navbar from '../Navbar/Navbar'
import Header from '../../../Components.js/Header/Header'
import Networks from '../../../Components.js/Networks/Networks';
import Footer from '../../../Components.js/Footer';
import GendresVer from '../../../Components.js/Gendres/GendresVer';
import { GoTop } from '../../../Components.js/Functions';
import { useEffect } from 'react';
import List from '../../../Components.js/Gendres/List';
import { useDispatch, useSelector } from 'react-redux';
import { getShows } from '../../../Components.js/Redux/Slices/ShowsSlice';

function Home() {
    GoTop("Movify | More than you'd ever imagine")

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getShows())
    }, [dispatch]);


    let works = useSelector(state => state.shows.shows)
    let loading = useSelector(state => state.shows.loading)
    
    let show = useSelector(state => state.shows.show)
    let loadingshow = useSelector(state => state.shows.loadingshow)


  return (
    <div className='text-mywhite bg-primary min-h-screen'>
      <Navbar />

      <div className='pb-32'>
        <Header item={show} type={show?.video ? 'movie' : 'serie'} loading={loadingshow} />
        
        <div className='min-h-screen'> 
          <Networks />
          <List />
          <GendresVer data={works} loading={loading} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home