import React from 'react'
import { FaCircle } from "react-icons/fa";
import { PiLineVertical } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

function Header() {
  return (
    <header style={{ backgroundImage: `url(../assets/images/bg.jpg)`}} className=' relative h-screen Header flex items-center'>
        <div className='px-20 GradientTop h-full w-full flex items-center'>
            <div className='w-1/3'>
                <img src='../assets/images/logo.png' alt='logo' className='w-full' />
                <div className='flex space-x-2 items-center mt-8 opacity-80'>
                    <p> 2024 </p> <FaCircle size={6} />
                    <p> 1h 32m </p> <FaCircle size={6} />
                    <p> 3 Seasons </p> 
                </div>
                <p className='mt-4 opacity-80'>
                    Daughters of the Queen of Hearts and Cinderella travel back in time to prevent a coup in Auradon.
                </p>
                <div className='flex space-x-2 opacity-80 items-center mt-4'>
                    <p> Fantasy  </p> <PiLineVertical size={22} />
                    <p> Drama  </p> <PiLineVertical size={22} />
                    <p> Comedy  </p>
                </div>
                <div className='mt-6 flex items-stretch space-x-4'>
                    <button className='flex items-center space-x-2 font-medium bg-white bg-opacity-30 transition-all hover:scale-105 hover:bg-opacity-40 rounded-md w-full justify-center py-3'> 
                        <FaPlay />
                        <p> Watch Now </p> 
                    </button>
                    <button className='bg-white bg-opacity-30 transition-all hover:scale-105 hover:bg-opacity-40 rounded-md px-6'> 
                        <FaPlus size={18} />
                    </button>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header