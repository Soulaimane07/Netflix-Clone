import React, { useEffect, useRef, useState } from 'react'
import { FaCircle } from "react-icons/fa";
import { PiLineVertical } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

import { IoVolumeMuteOutline } from "react-icons/io5";
import { GoUnmute } from "react-icons/go";


function Header({item}) {
    const [showVideo, setShowVideo] = useState(false)
    const [muted, setMuted] = useState(true)
    const videoRef = useRef(null);
    
    useEffect(() => {
        setTimeout(() => {
            if (videoRef.current) {
                setShowVideo(true)
                videoRef.current.play();
            }
        }, 3000);
    }, []);

  return (
    <header style={{ backgroundImage: `url(${item.bgimage})`}} className=' h-screen Header flex items-center'>
        <video ref={videoRef} muted={muted} className='w-full relative object-cover h-full' src={item?.trailer}  poster={item.bgimage} />
        <div className=' absolute justify-between top-0 left-0 px-20 GradientTop h-full w-full flex items-center'>
            <div className='w-1/3'>
                <img src={item.logoimage} alt='logo' className='w-full' />
                <div className='flex space-x-2 items-center mt-8 opacity-80'>
                    <p> 2024 </p> <FaCircle size={6} />
                    <p> 1h 32m </p> <FaCircle size={6} />
                    <p> 3 Seasons </p> 
                </div>
                <p className='mt-4 opacity-80'>
                    Daughters of the Queen of Hearts and Cinderella travel back in time to prevent a coup in Auradon.
                </p>
                <div className='flex space-x-2 opacity-80 items-center mt-4'>
                    {item?.genres?.map((item,key)=>(
                        <div key={key} className='flex items-center'>
                            <Link to={`/gendres/${item.id}`}> {item.title}  </Link> 
                            {key !== -1 && <PiLineVertical size={22} />}
                        </div>
                    ))}  
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

            <button className='hover:scale-105 transition-all opacity-50 bg-transparent hover:opacity-90' onClick={()=> setMuted(!muted)}>
                {showVideo && (muted ? <GoUnmute size={40} className='bg-transparent' /> : <IoVolumeMuteOutline size={40} className='bg-transparent' />)}
            </button>
        </div>
    </header>
  )
}

export default Header