import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import SearchBox from './SearchBox'
import Profile from './Profile'

function Navbar() {
    const links = [
        {
            "title": "Home",
            "link": "/browse"
        },
        {
            "title": "Series",
            "link": "/series"
        },
        {
            "title": "Movies",
            "link": "/movies"
        },
    ]

    const [navbar, setNavbar] = useState(false)
    const [y, setY] = useState(0)

    const changebg = () => {
        if(window.scrollY !== 0){
            setNavbar(true);
        } else {
            setNavbar(false)
        }

        if(window.scrollY < y){
            setNavbar(false)
        }
        setY(window.scrollY)
    }

    window.addEventListener('scroll',changebg)
    
  return (
    <nav className={`${navbar ? '-top-32' : 'top-0'} GradientBottm transition-all z-50 flex items-center px-14 py-5 fixed top-0 w-full justify-between`}>
        <div className='flex items-center space-x-10'>
            <Link to="/browse">
                <img src="../assets/images/disney-plus-logo.webp" alt='logo' className='w-20' />
            </Link>

            <ul className='text-white space-x-6'>
                {links.map((item,key)=> (
                    <NavLink to={item.link} key={key}>
                        {item.title}
                    </NavLink>
                ))}
            </ul>
        </div>

        <div className='flex items-center space-x-6'>
            <SearchBox />
            <Profile />
        </div>
    </nav>
  )
}

export default Navbar