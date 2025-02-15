import React from 'react'
import Footer from '../../../../Components.js/Footer'
import { Link } from 'react-router-dom'

function Details() {
  return (
    <>
        <div className='Header min-h-screen bg-primary p-10 items-center' style={{ backgroundImage: `url(../assets/images/stars_bg.webp)`}}>
            <Link to="/">
                <img src='../assets/images/disney-plus-logo.webp' className='w-20' alt="logo" />
            </Link>
            <div className='text-center text-white'>
                <h1 className=' text-4xl font-medium'> Interests </h1>
            </div>

            {/* <div className='w-3/12  mx-auto text-white'>
                <h2 className=' opacity-70 text-center mb-4'>STEP 2 OF 4</h2>
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
                <p className=' text-gray-500 text-justify text-xs'>
                    We will use your information as detailed in the 
                    <a href='#' className=' text-gray-400'> Subscriber Agreement </a>, 
                    <a href='#' className=' text-gray-400'>Privacy Policy</a>, 
                    <a href='#' className=' text-gray-400'>Cookie Policy</a>, 
                    , including to personalise your experience and send service updates. By clicking “Get Code”, you agree to the terms of our Subscriber Agreement and you also acknowledge and agree that your personal data will be processed in accordance with applicable law outside of your country of residence including in countries that may provide a different level of data protection. This site is protected by reCAPTCHA and the Google 
                    <a href='#' className=' text-gray-400'>Privacy Policy</a> 
                    and 
                    <a href='#' className=' text-gray-400'>Terms of Service</a> 
                    apply.
                </p>
            </div> */}
        </div>
        <Footer />
    </>
  )
}

export default Details