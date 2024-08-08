import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Auth from './Interfaces/Auth';
import User from './Interfaces/User';
import { login, logout, setProfilee } from './Components.js/Redux/Slices/UserSlice';
import PreLogged from './Interfaces/PreLogged';
import { getProfile } from './Components.js/Redux/Slices/ProfileSlice';

function App() {
  let dispatch = useDispatch()

  let user = JSON.parse(localStorage.getItem('Disney-user'))
  let userProfile = JSON.parse(localStorage.getItem('Disney-user-profile'))

  if (user) {
    dispatch(login(user))
    if(userProfile) {
      dispatch(setProfilee(userProfile))
      dispatch(getProfile(userProfile.id))
    }
  } else {
    dispatch(logout())
  }
  
  const logged = useSelector(state => state.user.logged)
  const preLogged = useSelector(state => state.user.preLogged)


  // console.log(userProfile);
  

  return (
    <>
      {!logged  ? !preLogged  ? <Auth /> : <PreLogged />
                : <User />
      }
      
    </>
  );
}

export default App;
