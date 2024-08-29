import { Link } from 'react-router-dom'
import Header from './Header'
import { useSelector } from 'react-redux'
import Profiles from './Profiles'
import Footer from '../../../Components.js/Footer'
import { GoTop } from '../../../Components.js/Functions'
import Watchlist from './Watchlist'
import { logo } from '../../../Components.js/Variables'

function Profile() {
    GoTop("Movify | The greatest stories, all in one place")

    const user = useSelector(state => state.user.user)
    const profile = useSelector(state => state.user.profile)

  return (
    <>
        <div className='Header text-mywhite min-h-screen bg-primary pb-32 pt-1.5' style={{ backgroundImage: `url(../assets/images/stars_bg.webp)`}}>
            <div className=' bg-transparent transition-all  px-14 py-6 w-fit'>
                <Link to="/" className=''>
                    <img src={logo} className='w-40' alt="logo" />
                </Link>
            </div>
            
            <div className=' mt-14  mx-auto'>
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