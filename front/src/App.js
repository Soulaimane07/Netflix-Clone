import { useSelector } from 'react-redux';
import './App.css';
import Auth from './Interfaces/Auth';
import User from './Interfaces/User';

function App() {
  const logged = useSelector(state => state.user.isLogged)

  return (
    <>
      {!logged ? <Auth /> : <User />}
    </>
  );
}

export default App;
