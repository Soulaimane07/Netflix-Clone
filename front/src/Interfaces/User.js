import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from '../Pages/User/Home/Home'

function User() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/browse' element={<Home />} />
            <Route path='/*' element={<Navigate to="/browse" replace={true} />} />
        </Routes>
    </BrowserRouter>
  )
}

export default User