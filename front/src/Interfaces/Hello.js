import React, { useEffect, useState } from 'react'
import Footer from '../Components.js/Footer'
import { GetUserProfiles } from '../Components.js/Functions'
import { useDispatch, useSelector } from 'react-redux'
import { setProfilee } from '../Components.js/Redux/Slices/UserSlice'
import { getProfile } from '../Components.js/Redux/Slices/ProfileSlice'
import { GoPlus } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { logo } from '../Components.js/Variables'

function Hello() {
    const dispatch = useDispatch()

    const userId = useSelector(state => state.user?.user?.id)
    const userProfiles = GetUserProfiles(userId)

    const error = false
    const [profile, setProfile] = useState(null)

    const Submit = (e) => {
        e.preventDefault()
        dispatch(setProfilee(userProfiles[profile]))
        dispatch(getProfile(userProfiles[profile]?.id))
    }


    useEffect(() => {
        const elements = document.querySelectorAll('.slide-up-element');
        elements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('visible');
          }, index * 60); // Stagger by 100ms for each element
        });
    }, []);

  return (
    <>
    <div className='Header text-mywhite min-h-screen bg-primary  items-center flex' style={{ backgroundImage: `url(../assets/images/stars_bg.webp)`}}>
        <div to="/" className=' absolute top-10 px-10'>
            <img src={logo} className='w-32' alt="logo" />
        </div>

        <div className='mx-auto bg-opacity-10 overflow-hidden'>
          <form onSubmit={Submit} className='mb-10 w-full'>
                <h1 className='text-center text-3xl font-medium mb-10 '> Choose your profile </h1>

                <ul className='flex flex-row px-20 items-start  overflow-x-scroll Scroll space-x-4 py-4 scroll-smooth justify-around slide-up-element'>
                    {userProfiles?.map((item,key)=>(
                        <button onClick={()=> setProfile(key)} key={key} className={"hover:scale-105 transition-all "}> 
                            <img src={item.profile} className={`w-40 mb-2 text-center transition-all border-4 border-transparent cursor-pointer rounded-full   p-0 m-0 ${profile === null || profile === key ? "opacity-100 transition-all" : "opacity-60 transition-all"} ${!error & profile === key && "bg-white transition-all opacity-100"} ${(error && profile === item.id) && "bg-red-600"}`} alt='profile' /> 
                            <h2 className={`${profile === null || profile === key ? "opacity-100 transition-all" : "opacity-60 transition-all"}`}> {item.name} </h2>
                        </button>
                    ))}
                    {userProfiles?.length < 5 &&
                        <Link to={"add-profile"} className={"hover:scale-105 mt-3 transition-all flex flex-col opacity-70 hover:opacity-90"}> 
                            <span className='p-12 cursor-pointer rounded-full border-2 '>
                                <GoPlus size={40} className=' ' />
                            </span>
                        </Link>
                    }
                </ul>
          </form>
        </div>
    </div>
    <Footer />
  </>
  )
}

export default Hello