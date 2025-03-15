import React, { useEffect, useState } from 'react'
import Footer from '../../../Components.js/Footer';
import Spinner from '../../../Components.js/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { GetProfiles } from '../../../Components.js/Functions';
import axios from 'axios';
import { BaseUrl, logo } from '../../../Components.js/Variables';
import Error from '../../../Components.js/Alerts/Error';
import { useDispatch } from 'react-redux';
import { signout } from '../../../Components.js/Redux/Slices/UserSlice';

function AddProfile() {
    useEffect(() => {
        document.title = 'Movify | Register';
    }, []);
    
    const profiles = GetProfiles()
    console.log(profiles);
    

    const navigate = useNavigate()
    const dispatch = useDispatch()


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
        
        let user = JSON.parse(localStorage.getItem("movify-user"))

        axios.post(`${BaseUrl}/userprofiles`, {user, profile, name})
            .then(res => {
                if (res.status === 201) {
                    navigate("/")
                    dispatch(signout())
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


    useEffect(() => {
        const elements = document.querySelectorAll('.slide-up-element');
        elements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('visible');
          }, index * 60);
        });
    }, []);
    

  return (
    <>
        <div className='Header text-mywhite min-h-screen bg-primary  items-center flex' style={{ backgroundImage: `url(../assets/images/stars_bg.webp)`}}>
            <Link to="/" className=' absolute top-10 px-10'>
                <img src={logo} className='w-32' alt="logo" />
            </Link>

            <div className='mx-auto  bg-opacity-10 overflow-hidden'>
              <form onSubmit={Submit} className='mb-10 w-full'>
                    <h1 className='text-center text-3xl font-medium mb-6 '> Create profile </h1>
                    <div className='h-12 flex items-center justify-center'><Error display={error} text="Profile cant be created !" /></div>

                    <ul className="Scroll flex flex-row overflow-x-scroll gap-6 px-10 py-4">
                        {profiles?.map((profileItem) => (
                            <li 
                            key={profileItem.id} 
                            onClick={() => setProfile(profileItem)} 
                            className={`hover:border-white transition-all border-4 border-transparent cursor-pointer rounded-full flex-none 
                                ${profile?.id === profileItem?.id ? "opacity-100 bg-white" : "opacity-60"} 
                                ${error && profile?.id === profileItem?.id ? "bg-red-600" : ""}
                            `}
                            >
                            <img 
                                src={profileItem.image} 
                                className="w-32 h-32 rounded-full object-cover" 
                                alt="profile" 
                            />
                            </li>
                        ))}
                    </ul>
                    <div className='flex flex-col w-3/12 mx-auto mt-6 space-y-2 mb-8'>
                        <label> Profile name </label>
                        <input onChange={(e)=> setName(e.target.value)} placeholder='' type='text' className={`${error ? 'ring-red-500 ring-2 border-transparent' : 'ring-0'}  ring transition-all outline-none text-md bg-transparent border border-white border-opacity-40 rounded-md py-2 px-4`} />
                    </div> 

                    <button disabled={cond || error} className={`${cond || error ? 'opacity-60' : 'opacity-100 hover:scale-105'} w-3/12 mx-auto flex justify-center items-center transition-all bg-myorange  px-12 py-3 rounded-md`}> 
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

export default AddProfile