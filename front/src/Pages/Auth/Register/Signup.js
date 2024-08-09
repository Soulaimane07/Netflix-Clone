import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../../Components.js/Footer'
import Spinner from '../../../Components.js/Spinner';
import Error from '../../../Components.js/Alerts/Error';
import axios from 'axios';
import { BaseUrl } from '../../../Components.js/Variables';
import Policies from '../Policies';

function Signup() {
  useEffect(() => {
    document.title = 'Disney+ | Register';
  }, []);

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")

    let cond = email === "" || pass === "" || pass.length < 4 || fname === "" || lname === ""
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(()=>{
        setError(false)
    }, [email, pass, fname, lname])

    const SignupFun = (e) => {
        e.preventDefault()
        setLoading(true)
        setError(false)

        axios.post(`${BaseUrl}/users`, {email, pass, fname, lname})
            .then((res)=>{
                if(res.status === 201){
                    console.log(res)
                    localStorage.setItem("Disney-user", JSON.stringify(res.data))
                    navigate('/register/profile')
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
        <div className='Header min-h-screen bg-primary p-10 items-center' style={{ backgroundImage: `url(../assets/images/stars_bg.webp)`}}>
            <Link to="/">
                <img src='../assets/images/disney-plus-logo.webp' className='w-20' alt="logo" />
            </Link>

            <div className='w-3/12  mx-auto text-white'>
                <h2 className=' opacity-70 text-center mb-4'>STEP 2 OF 3</h2>
                <form onSubmit={SignupFun} className='mb-10'>
                    <h1 className='text-center text-3xl font-medium mb-10'> Create your account </h1>
                    <div className='h-12 flex items-center justify-center'><Error display={error} text="Login or password are wrong !" /></div>
                    
                    <div className='flex flex-col space-y-2 mb-6'>
                        <label> Email Adress </label>
                        <input onChange={(e)=> setEmail(e.target.value)} placeholder='' type='email' className={`${error ? 'ring-red-500 ring-2 border-transparent' : 'ring-0'}  ring transition-all  outline-none text-md bg-transparent border border-white border-opacity-40 rounded-md py-2 px-4`} />
                    </div>
                    <div className='flex flex-col space-y-2 mb-8'>
                        <label> First name </label>
                        <input onChange={(e)=> setFname(e.target.value)} placeholder='' type='text' className={`${error ? 'ring-red-500 ring-2 border-transparent' : 'ring-0'}  ring transition-all outline-none text-md bg-transparent border border-white border-opacity-40 rounded-md py-2 px-4`} />
                    </div> 
                    <div className='flex flex-col space-y-2 mb-8'>
                        <label> Last name </label>
                        <input onChange={(e)=> setLname(e.target.value)} placeholder='' type='text' className={`${error ? 'ring-red-500 ring-2 border-transparent' : 'ring-0'}  ring transition-all outline-none text-md bg-transparent border border-white border-opacity-40 rounded-md py-2 px-4`} />
                    </div> 
                    <div className='flex flex-col space-y-2 mb-8'>
                        <label> Password </label>
                        <input onChange={(e)=> setPass(e.target.value)} placeholder='' type='password' className={`${error ? 'ring-red-500 ring-2 border-transparent' : 'ring-0'}  ring transition-all outline-none text-md bg-transparent border border-white border-opacity-40 rounded-md py-2 px-4`} />
                    </div> 

                    <button disabled={cond || error} className={`${cond || error ? 'opacity-60' : 'opacity-100 hover:scale-105'} w-full flex justify-center items-center transition-all bg-blue-600 text-white px-12 py-3 rounded-md`}> 
                        {loading 
                            ?   <Spinner />
                            :   <span> Sign Up </span>
                        }
                    </button>
                </form>
                <Policies />
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Signup