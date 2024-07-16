import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from '../Pages/User/Home/Home'
import Profile from '../Pages/User/Profile/Profile'
import Subscribe from '../Pages/User/Subscribe/Subscribe'

function User() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/browse' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/subscribe' element={<Subscribe />} />
            <Route path='/*' element={<Navigate to="/browse" replace={true} />} />
        </Routes>
    </BrowserRouter>
  )
}

export default User