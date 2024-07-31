import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from '../Pages/User/Home/Home'
import Profile from '../Pages/User/Profile/Profile'
import Subscribe from '../Pages/User/Subscribe/Subscribe'
import Networks from '../Pages/User/Networks/Networks'
import Network from '../Pages/User/Network/Network'
import Series from '../Pages/User/Series/Series'
import Movies from '../Pages/User/Movies/Movies'
import Gendres from '../Pages/User/Gendres/Gendres'
import Gendre from '../Pages/User/Gendre/Gendre'
import Work from '../Pages/User/Work/Work'
import Watch from '../Pages/User/Watch/Watch'
import { useSelector } from 'react-redux'
import AddProfile from '../Pages/User/Profile/AddProfile'
import Search from '../Pages/User/Search/Search'

function User() {
  const openedWatch = useSelector(state => state.watch.opened)
  const openedSearch = useSelector(state => state.search.opened)

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/browse' element={<Home />} />
            <Route path='/work/:type/:id' element={<Work />} />
            <Route path='/networks'>
              <Route index element={<Networks />} />
              <Route path=":id" element={<Network />} />
            </Route>
            <Route path='/gendres'>
              <Route index element={<Gendres />} />
              <Route path=":id" element={<Gendre />} />
            </Route>
            <Route path='/series'>
              <Route index element={<Series />} />
            </Route>
            <Route path='/movies'>
              <Route index element={<Movies />} />
            </Route>
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/add-profile' element={<AddProfile />} />
            <Route path='/subscribe' element={<Subscribe />} />
            <Route path='/*' element={<Navigate to="/browse" replace={true} />} />
        </Routes>

        {openedWatch && <Watch />}
        {openedSearch && <Search />}
    </BrowserRouter>
  )
}

export default User