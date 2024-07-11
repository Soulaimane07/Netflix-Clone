import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/User/Home/Home'

function User() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/browse' element={<Home />} />
        </Routes>
    </BrowserRouter>
  )
}

export default User