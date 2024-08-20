import React, { useEffect } from 'react'
import Footer from '../../../Components.js/Footer';
import { Link } from 'react-router-dom';
import { logo } from '../../../Components.js/Variables';

function Phase1() {
  useEffect(() => {
    document.title = 'Movify | Subscribe Now';
  }, []);

  return (
    <>
        <div className='Header min-h-screen bg-primary p-10 flex items-center' style={{ backgroundImage: `url(../assets/images/stars_bg.webp)`}}>
            <Link to="/" className=' absolute top-10'>
                <img src={logo} className='w-32' alt="logo" />
            </Link>
            <div className='w-3/12  mx-auto text-white text-center'>
              <h2 className=' opacity-70'>STEP 1 OF 3</h2>
              <h1 className=' text-3xl font-medium mt-10 mb-4'>Finish setting up your account</h1>
              <p className=' opacity-60 mb-10'>Disney+ is personalized for you. Create a password to watch on any device at any time.</p>
              <Link className="transition-all w-full flex justify-center hover:scale-105 items-center text-center bg-blue-600 text-white py-3 rounded-md" to={"signup"}> 
                Get Started 
              </Link>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Phase1