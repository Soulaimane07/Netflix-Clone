import React from 'react'
import Footer from '../../../Components.js/Footer'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <>
        <div className='Header min-h-screen bg-primary p-10' style={{ backgroundImage: `url(../assets/images/stars_bg.webp)`}}>
            <Link to="/">
                <img src='../assets/images/disney-plus-logo.webp' className='w-20' />
            </Link>
            
            <form className='text-white mx-auto w-3/12 mt-20'>
                <h1 className='text-center text-3xl font-medium mb-16'> Log in or sign up to continue </h1>
                <div className='flex flex-col space-y-2 mb-6'>
                    <label> Email Adress </label>
                    <input placeholder='' type='email' className=' outline-none text-lg bg-transparent border border-white border-opacity-40 rounded-md py-1 px-4' />
                </div>
                <div className='flex flex-col space-y-2 mb-6'>
                    <label> Password </label>
                    <input placeholder='' type='password' className=' outline-none text-lg bg-transparent border border-white border-opacity-40 rounded-md py-1 px-4' />
                </div> 

                <button className="w-full bg-blue-600 text-white px-12 py-2 rounded-md" to="/login"> Login </button>
            </form>
        </div>
        <Footer />
    </>
  )
}

export default Login