import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Auth from './Interfaces/Auth';
import User from './Interfaces/User';
import { login, logout } from './Components.js/Redux/Slices/UserSlice';

function App() {

  let user = JSON.parse(localStorage.getItem('Disney-user'))
  const logged = useSelector(state => state.user.isLogged)
  // const logged = false

  let dispatch = useDispatch()

  if (user) {
    dispatch(login(user))
  } else {
    dispatch(logout())
  }

  return (
    <>
      {!logged ? <Auth /> : <User />}
    </>
  );
}

export default App;
