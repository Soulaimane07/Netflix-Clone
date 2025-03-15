import React, { useEffect, useState } from 'react'
import Footer from '../../../Components.js/Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BaseUrl, logo } from '../../../Components.js/Variables'
import { useDispatch } from 'react-redux'
import { prelog } from '../../../Components.js/Redux/Slices/UserSlice'
import Spinner from '../../../Components.js/Spinner'
import Error from '../../../Components.js/Alerts/Error'
import Policies from '../Policies'
import { setProfiles } from '../../../Components.js/Redux/Slices/ProfileSlice'

function Login() {
    useEffect(() => {
        document.title = 'Movify | Login';
    }, []);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    
    let cond = email === "" || pass === "" || pass.length < 4
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(()=>{
        setError(false)
    }, [email, pass])

    const LoginFun = (e) => {
        e.preventDefault()
        setLoading(true)
        setError(false)

        axios.post(`${BaseUrl}/users/login`, {email, pass})
            .then((res)=>{
                if(res.status === 200){
                    navigate('/')
                    dispatch(prelog(res.data.person))
                    dispatch(setProfiles(res.data.profiles))
                    setLoading(false)
                } else {
                    console.log(res)
                    setLoading(false)
                    setError(true)
                }
            })
            .catch((err)=> {
                console.error(err);
                setLoading(false)
                setError(true)
            })
    }

  return (
    <>
        <div className='Header min-h-screen text-mywhite bg-primary p-10' style={{ backgroundImage: `url(../assets/images/stars_bg.webp)`}}>
            <Link to="/">
                <img src={logo} className='w-32' alt="logo" />
            </Link>
            
            <div className='w-3/12 mt-20  mx-auto'>
                <form onSubmit={LoginFun} className='mb-10'>
                    <h1 className='text-center text-3xl font-medium mb-10'> Log in to continue </h1>
                    <div className='h-12 flex items-center justify-center'><Error display={error} text="Login or password are wrong !" /></div>
                    <div className='flex flex-col space-y-2 mb-6'>
                        <label> Email Adress </label>
                        <input onChange={(e)=> setEmail(e.target.value)} placeholder='' type='email' className={`${error ? 'ring-red-500 ring-2 border-transparent' : 'ring-0'}  ring transition-all  outline-none text-md bg-transparent border border-white border-opacity-40 rounded-md py-2 px-4`} />
                    </div>
                    <div className='flex flex-col space-y-2 mb-8'>
                        <label> Password </label>
                        <input onChange={(e)=> setPass(e.target.value)} placeholder='' type='password' className={`${error ? 'ring-red-500 ring-2 border-transparent' : 'ring-0'}  ring transition-all outline-none text-md bg-transparent border border-white border-opacity-40 rounded-md py-2 px-4`} />
                    </div> 

                    <button disabled={cond || error} className={`${cond || error ? 'opacity-60' : 'opacity-100 hover:scale-105'} w-full flex justify-center items-center transition-all bg-myorange px-12 py-3 rounded-md`}> 
                        {loading 
                            ?   <Spinner />
                            :   <span> Login </span>
                        }
                    </button>
                </form>

                <Policies />

                <div className='flex space-x-2 mt-20 justify-center'>
                    <h2 className=' opacity-50'>Don't you have an account ? </h2>
                    <Link className=' text-myorange hover:underline transition-all' to={"/register"}>Sign Up Now !</Link>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Login