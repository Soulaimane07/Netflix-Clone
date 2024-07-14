import React, { useEffect, useState } from 'react'
import Footer from '../../../Components.js/Footer';
import Spinner from '../../../Components.js/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { GetProfiles } from '../../../Components.js/Functions';
import axios from 'axios';
import { BaseUrl } from '../../../Components.js/Variables';
import Error from '../../../Components.js/Alerts/Error';

function Profile() {
    useEffect(() => {
        document.title = 'Disney+ | Register';
    }, []);

    const navigate = useNavigate()


    const [profile, setProfile] = useState(null)
    const [name, setName] = useState("")
    let cond = profile === null || name === "" || name.length < 4

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    
    useEffect(()=>{
        setError(false)
    }, [profile, name])

    const Submit = (e) => {
        e.preventDefault()
        setLoading(true)
        setError(false)
        
        let user = JSON.parse(localStorage.getItem("disney-user"))

        axios.post(`${BaseUrl}/userprofiles`, {user, profileId: profile, name})
            .then(res => {
                if (res.status === 201) {
                    console.log(res.data);
                    localStorage.setItem("disney-Profile", JSON.stringify(res.data))
                    navigate("/register/details")
                } else {
                    setLoading(false)
                    setError(true)
                }
            })
            .catch(err => {
                console.error(err);
                setLoading(false)
                setError(true)
            })
    }

    const profiles = GetProfiles()

  return (
    <>
        <div className='Header min-h-screen bg-primary  items-center flex' style={{ backgroundImage: `url(../assets/images/stars_bg.webp)`}}>
            <Link to="/" className=' absolute top-10 px-10'>
                <img src='../assets/images/disney-plus-logo.webp' className='w-20' alt="logo" />
            </Link>

            <div className='mx-auto text-white bg-opacity-10 overflow-hidden'>
              <h2 className=' opacity-70 text-center mb-4'>STEP 3 OF 4</h2>

              <form onSubmit={Submit} className='mb-10 w-full'>
                    <h1 className='text-center text-3xl font-medium mb-10 '> Create your profile </h1>
                    <div className='h-12 flex items-center justify-center'><Error display={error} text="Profile cant be created !" /></div>

                    <ul className=' flex flex-row px-20  overflow-x-scroll Scroll space-x-4 py-4 scroll-smooth justify-around'>
                        {profiles?.map((item,key)=>(
                            <li onClick={()=> setProfile(item.id)} key={key} className={`hover:border-white transition-all border-4 border-transparent cursor-pointer rounded-full   p-0 m-0 ${profile === null || profile === item.id ? "opacity-100 transition-all" : "opacity-60 transition-all"} ${!error & profile === item.id && "bg-white transition-all opacity-100"} ${(error && profile === item.id) && "bg-red-600"}`}> 
                                <img src={item.image} className='w-40' alt='profile' /> 
                            </li>
                        ))}
                    </ul>
                    <div className='flex flex-col w-3/12 mx-auto mt-6 space-y-2 mb-8'>
                        <label> Profile name </label>
                        <input onChange={(e)=> setName(e.target.value)} placeholder='' type='text' className={`${error ? 'ring-red-500 ring-2 border-transparent' : 'ring-0'}  ring transition-all outline-none text-md bg-transparent border border-white border-opacity-40 rounded-md py-2 px-4`} />
                    </div> 

                    <button disabled={cond || error} className={`${cond || error ? 'opacity-60' : 'opacity-100 hover:scale-105'} w-3/12 mx-auto flex justify-center items-center transition-all bg-blue-600 text-white px-12 py-3 rounded-md`}> 
                        {loading 
                            ?   <Spinner />
                            :   <span> Create </span>
                        }
                    </button>
              </form>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Profile