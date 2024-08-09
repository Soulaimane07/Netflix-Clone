import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AddProfile from '../Pages/User/Profile/AddProfile'
import Hello from './Hello'

function PreLogged() {
    


  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={
              <Hello />
              } 
            />
            <Route path='/add-profile' element={<AddProfile />} />
            <Route path='/*' element={<Navigate to="/" replace={true} />} />
        </Routes>
    </BrowserRouter>
    


  )
}

export default PreLogged