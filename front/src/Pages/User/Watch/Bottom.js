import React, { useState } from 'react'
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { BsFullscreen } from "react-icons/bs";
import { FaVolumeXmark } from "react-icons/fa6";
import { IoIosVolumeHigh } from "react-icons/io";

function Bottom({handlePlayPause, isPlaying, duration, currentTime, handleSeek, handleMuteToggle, muted, handleVolumeChange, volume, fullscreen}) {
  const [showVolume, setVolume] = useState(false)


  return (
    <div className='px-16 pb-6 pt-1 w-full absolute bottom-0 '>
      <input 
        class="w-full cursor-pointer transition-all outline-none accent-myorange"
        type="range" 
        min="0" 
        max={duration} 
        value={currentTime} 
        onInput={handleSeek}
      />

      <div className='mt-4 flex items-center justify-between'> 
          <div className='flex items-center space-x-8'>
            <div className='flex items-center space-x-8'>
                <button className=' hover:scale-125 transition-all'> <RiArrowLeftDoubleFill size={40} /> </button>
                <button onClick={handlePlayPause} className=' hover:scale-125 transition-all'> {isPlaying ? <FaPause size={30} /> : <FaPlay size={24} />} </button>
                <button className=' hover:scale-125 transition-all'> <RiArrowRightDoubleFill size={40} /> </button>
            </div>
            <div onMouseEnter={()=> setVolume(true)} onMouseLeave={()=> setVolume(false)} className='flex items-center space-x-8'>
              <button  onClick={handleMuteToggle} className=' transition-all hover:scale-125'> {muted ? <FaVolumeXmark size={26} /> : <IoIosVolumeHigh size={40} />} </button>
              <input 
                class={`w-full cursor-pointer transition-all outline-none accent-myorange ${showVolume ? "opacity-100" : "opacity-0 w-0"}`}
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume} 
                onChange={handleVolumeChange} 
              />
            </div>
          </div>

          
          <div className='flex items-center space-x-8'>
              <button onClick={fullscreen} className=' hover:scale-125 transition-all'> <BsFullscreen size={24} /> </button>
          </div>
      </div>
    </div>
  )
}

export default Bottom