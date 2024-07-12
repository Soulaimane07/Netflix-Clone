import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from '../Pages/Auth/Welcome/Welcome'
import Login from '../Pages/Auth/Login/Login'
import Phase1 from '../Pages/Auth/Register/Phase1'
import Signup from '../Pages/Auth/Register/Signup'
import Profile from '../Pages/Auth/Register/Profile'
import Details from '../Pages/Auth/Register/Details/Details'

function Auth() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register'>
              <Route index element={<Phase1 />} />
              <Route path='signup' element={<Signup />} />
              <Route path='profile' element={<Profile />} />
              <Route path='details' element={<Details />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Auth