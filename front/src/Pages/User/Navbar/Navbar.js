import { Link, NavLink } from 'react-router-dom'
import SearchBox from './SearchBox'
import Profile from './Profile'

function Navbar() {
    const links = [
        {
            "title": "Browse",
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
        {
            "title": "Anime",
            "link": "/anime"
        },
    ]
    
  return (
    <nav className={`top-0 GradientBottm transition-all z-50 flex items-center px-14 py-5 fixed w-full justify-between`}>
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