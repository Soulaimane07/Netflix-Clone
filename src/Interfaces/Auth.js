import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Welcome from '../Pages/Auth/Welcome/Welcome'
import Login from '../Pages/Auth/Login/Login'
import Phase1 from '../Pages/Auth/Register/Phase1'
import Signup from '../Pages/Auth/Register/Signup'
import Profile from '../Pages/Auth/Register/Profile'

function Auth() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register'>
              <Route index element={<Phase1 />} />
              <Route path='signup' element={<Signup />} />
              <Route path='profile' element={<Profile auth={true} />} />
            </Route>
            <Route path='/*' element={<Navigate to="/" replace={true} />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Auth