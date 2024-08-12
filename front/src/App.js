import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Auth from './Interfaces/Auth';
import User from './Interfaces/User';
import { login, logout, setProfilee, signout } from './Components.js/Redux/Slices/UserSlice';
import PreLogged from './Interfaces/PreLogged';
import { logProfile } from './Components.js/Redux/Slices/ProfileSlice';

function App() {
  let dispatch = useDispatch()

  let user = JSON.parse(localStorage.getItem('Disney-user'))
  let userProfile = JSON.parse(localStorage.getItem('Disney-user-profile'))

  if (user) {
    dispatch(login(user))
    if(userProfile) {
      dispatch(setProfilee(userProfile))
      dispatch(logProfile(userProfile))
    } else {
      dispatch(signout())
    }
  } else {
    dispatch(logout())
  }
  
  const logged = useSelector(state => state.user.logged)
  const preLogged = useSelector(state => state.user.preLogged)


  

  return (
    <>
      {!logged  ? !preLogged  ? <Auth /> : <PreLogged />
                : <User />
      }
      
    </>
  );
}

export default App;
