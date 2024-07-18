import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import { useSelector } from 'react-redux'
import Profiles from './Profiles'
import Footer from '../../../Components.js/Footer'

function Profile() {
  const user = useSelector(state => state.user.user)
  const profile = useSelector(state => state.user.profile)

  return (
    <>
        <div className='Header min-h-screen bg-primary p-10' style={{ backgroundImage: `url(../assets/images/stars_bg.webp)`}}>
            <Link to="/">
                <img src='../assets/images/disney-plus-logo.webp' className='w-20' alt="logo" />
            </Link>
            
            <div className='px-20 mt-20  mx-auto text-white'>
                <Header user={user} />
                <Profiles user={user} profilee={profile} />

                {/* <form onSubmit={LoginFun} className='mb-10'>
                    <h1 className='text-center text-3xl font-medium mb-10'> Log in or sign up to continue </h1>
                    <div className='h-12 flex items-center justify-center'><Error display={error} text="Login or password are wrong !" /></div>
                    <div className='flex flex-col space-y-2 mb-6'>
                        <label> Email Adress </label>
                        <input onChange={(e)=> setEmail(e.target.value)} placeholder='' type='email' className={`${error ? 'ring-red-500 ring-2 border-transparent' : 'ring-0'}  ring transition-all  outline-none text-md bg-transparent border border-white border-opacity-40 rounded-md py-2 px-4`} />
                    </div>
                    <div className='flex flex-col space-y-2 mb-8'>
                        <label> Password </label>
                        <input onChange={(e)=> setPass(e.target.value)} placeholder='' type='password' className={`${error ? 'ring-red-500 ring-2 border-transparent' : 'ring-0'}  ring transition-all outline-none text-md bg-transparent border border-white border-opacity-40 rounded-md py-2 px-4`} />
                    </div> 

                    <button disabled={cond || error} className={`${cond || error ? 'opacity-60' : 'opacity-100 hover:scale-105'} w-full flex justify-center items-center transition-all bg-blue-600 text-white px-12 py-3 rounded-md`}> 
                        {loading 
                            ?   <Spinner />
                            :   <span> Login </span>
                        }
                    </button>
                </form> */}


                
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Profile