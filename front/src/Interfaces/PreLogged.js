import React, { useEffect, useState } from 'react'
import Footer from '../Components.js/Footer'
import { GetUserProfiles } from '../Components.js/Functions'
import { useDispatch, useSelector } from 'react-redux'
import { setProfilee } from '../Components.js/Redux/Slices/UserSlice'
import { getProfile } from '../Components.js/Redux/Slices/ProfileSlice'
import { GoPlus } from 'react-icons/go'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
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