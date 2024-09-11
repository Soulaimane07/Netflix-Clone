import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Auth from './Interfaces/Auth';
import User from './Interfaces/User';
import { login, logout, prelog, signout } from './Components.js/Redux/Slices/UserSlice';
import PreLogged from './Interfaces/PreLogged';
import { getProfiles, getWatchlist, logoutProfile, logProfile } from './Components.js/Redux/Slices/ProfileSlice';
import { getNetworks } from './Components.js/Redux/Slices/NetworksSlice';
import { getGenres } from './Components.js/Redux/Slices/GenresSlice';
import { useEffect } from 'react';
import { getViewinghistory } from './Components.js/Redux/Slices/ViewingHistorySlice';
import { getMovies } from './Components.js/Redux/Slices/MoviesSlice';
import { getSeries } from './Components.js/Redux/Slices/SeriesSlice';
import { getShow } from './Components.js/Redux/Slices/ShowsSlice';
import { GetUserProfile } from './Components.js/Functions';

function App() {
  let dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('movify-user'));
  const userprofile = JSON.parse(localStorage.getItem('movify-user-profile'));

  useEffect(() => {
    if (user) {
      dispatch(prelog(user))

      if(userprofile){
        dispatch(login(userprofile))
        dispatch(logProfile(userprofile))

        dispatch(getShow())
        dispatch(getNetworks())
        dispatch(getMovies())
        dispatch(getSeries())
        dispatch(getGenres())

        dispatch(getProfiles(user?.id))
        dispatch(getWatchlist(userprofile?.id))
        dispatch(getViewinghistory(userprofile?.id))
      } else {
        dispatch(signout())
        // dispatch(logoutProfile())
      }
    } else {
      dispatch(logout())
      dispatch(logoutProfile())
    }
  }, [user, dispatch])

  
  const logged = useSelector(state => state.user.logged)
  const preLogged = useSelector(state => state.user.preLogged)


  return ( logged ? <User /> : preLogged ? <PreLogged /> : <Auth /> )
}

export default App;
