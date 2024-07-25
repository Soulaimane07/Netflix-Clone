import React from 'react'
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { BsFullscreen } from "react-icons/bs";


function Bottom({fullscreen}) {
    const play = true

  return (
    <div className='px-16 pb-10 w-full absolute bottom-0 flex items-center justify-between'> 
        <div className='flex items-center space-x-8'>
            <button className=' hover:scale-125 transition-all'> <RiArrowLeftDoubleFill size={40} /> </button>
            <button className=' hover:scale-125 transition-all'> {play ? <FaPlay size={24} /> : <FaPause size={24} />} </button>
            <button className=' hover:scale-125 transition-all'> <RiArrowRightDoubleFill size={40} /> </button>
        </div>
        
        <div className='flex items-center space-x-8'>
            <button onClick={()=> fullscreen()} className=' hover:scale-125 transition-all'> <BsFullscreen size={24} /> </button>
        </div>
    </div>
  )
}

export default Bottom