import { Link } from 'react-router-dom'
import Header from './Header'
import { useSelector } from 'react-redux'
import Profiles from './Profiles'
import Footer from '../../../Components.js/Footer'
import { GoTop } from '../../../Components.js/Functions'
import Watchlist from './Watchlist'

function Profile() {
    GoTop("Disney+ | The greatest stories, all in one place")

    const user = useSelector(state => state.user.user)
    const profile = useSelector(state => state.user.profile)

  return (
    <>
        <div className='Header min-h-screen bg-primary pb-32 ' style={{ backgroundImage: `url(../assets/images/stars_bg.webp)`}}>
            <div className=' bg-transparent transition-all  px-14 py-6 w-fit'>
                <Link to="/" className=''>
                    <img src='../assets/images/disney-plus-logo.webp' className='w-20 ' alt="logo" />
                </Link>
            </div>
            
            <div className=' mt-14  mx-auto text-white'>
                <Header user={user} />
                <Profiles user={user} profilee={profile} />
                <Watchlist />
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Profile