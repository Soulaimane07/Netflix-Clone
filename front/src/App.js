import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Auth from './Interfaces/Auth';
import User from './Interfaces/User';
import { login, logout, prelog, signout } from './Components.js/Redux/Slices/UserSlice';
import PreLogged from './Interfaces/PreLogged';
import { getProfiles, logProfile } from './Components.js/Redux/Slices/ProfileSlice';
import { getNetworks } from './Components.js/Redux/Slices/NetworksSlice';
import { getGenres } from './Components.js/Redux/Slices/GenresSlice';
import { useEffect } from 'react';
import { getViewinghistory } from './Components.js/Redux/Slices/ViewingHistorySlice';

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

        dispatch(getProfiles(user?.id))
        dispatch(getViewinghistory(userprofile?.id))
        dispatch(getNetworks())
        dispatch(getGenres())
      } else {
        dispatch(signout())
      }
    } else {
      dispatch(logout())
    }
  }, [ dispatch])
  
  const logged = useSelector(state => state.user.logged)
  const preLogged = useSelector(state => state.user.preLogged)

  return ( logged ? <User /> : preLogged ? <PreLogged /> : <Auth /> )
}

export default App;
