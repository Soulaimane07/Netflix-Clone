import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header style={{ backgroundImage: `url(../assets/images/welcome_bg.webp)`}} className='flex flex-col Header h-screen'>
        <nav className='flex space-x-6 justify-end px-20 py-8 items-baseline'>
            <li className='flex bg-button text-white rounded-md overflow-hidden pr-2'>
                <p className='px-6 py-2'>Choose Language</p>
                <select className=' bg-button px-6 pl-2 py-2 outline-none'> 
                    <option>English</option>
                    <option>Francais</option>
                </select> 
            </li>
            <li>
                <Link className=" bg-button text-white px-12 py-2 rounded-md" to="/login"> Login </Link>
            </li>
        </nav>

        <article className='flex-1 flex items-center justify-center'>
            <section className=' justify-center flex flex-col'>
                <img src='../assets/images/disney-plus-logo.webp' alt="logo" className='w-72 mx-auto mb-10' />
                <p className=' text-white text-3xl w-2/3 text-center mx-auto mb-8'> Stream brand new Disney+ Originals, blockbusters, binge-worthy series and more </p>
                <Link className="bg-button w-1/3 mx-auto text-center text-white px-6 py-4 rounded-md" to="/signup"> Sign Up Now </Link>
            </section>
        </article>
    </header>
  )
}

export default Header