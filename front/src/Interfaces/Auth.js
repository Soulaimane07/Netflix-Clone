import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from '../Pages/Auth/Welcome/Welcome'
import Login from '../Pages/Auth/Login/Login'

function Auth() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Auth