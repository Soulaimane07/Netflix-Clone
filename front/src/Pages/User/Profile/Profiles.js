import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { GoPlus } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { getProfile, getWatchlist } from '../../../Components.js/Redux/Slices/ProfileSlice';
import { login } from '../../../Components.js/Redux/Slices/UserSlice';
import { getShow } from '../../../Components.js/Redux/Slices/ShowsSlice';

function Profiles({user, profilee}) {
    const dispatch = useDispatch()
    const userProfiles = useSelector(state => state.profile.profiles)

    useEffect(() => {
        document.title = 'Disney+ | Profile';
    }, []);


    const navigate = useNavigate()

    const ChangeProfile = (item) => {
        dispatch(getProfile(item.id))
        dispatch(getWatchlist(item.id))
        dispatch(login(item))
        navigate('/browse')
        dispatch(getShow())
    }

  return (
    <div className='mt-20 '>
        <h1 className='text-2xl px-16'> Profiles </h1>
        <ul className='flex flex-row px-16 overflow-x-scroll Scroll space-x-4 py-4 scroll-smooth'>
            {userProfiles?.map((item,key)=>(
                <button onClick={()=> ChangeProfile(item)} key={key} className={"hover:scale-105 transition-all"}> 
                    <img src={item.profile} className={`w-28 mb-2 text-white text-center transition-all border-4 border-transparent cursor-pointer rounded-full   p-0 m-0 ${profilee.id === item.id ? "opacity-100 transition-all bg-white" : "opacity-60 transition-all"}`} alt='profile' /> 
                    <h2 className={`${profilee.id === item.id ? "opacity-100 transition-all" : "opacity-60 transition-all"}`}> {item.name} </h2>
                </button>
            ))}
            {userProfiles?.length < 5 &&
                <Link to={"add-profile"} className={"hover:scale-105 transition-all flex flex-col opacity-70 hover:opacity-90"}> 
                    <span className='p-8 cursor-pointer rounded-full border-2 '>
                        <GoPlus size={40} className=' ' />
                    </span>
                </Link>
            }
        </ul>
    </div>
  )
}

export default Profiles