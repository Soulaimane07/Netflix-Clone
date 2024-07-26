import React, { useEffect, useRef, useState } from 'react'
import { FaCircle } from "react-icons/fa";
import { PiLineVertical } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

import { IoVolumeMuteOutline } from "react-icons/io5";
import { GoUnmute } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { open } from '../Redux/Slices/WatchSlice';
import axios from 'axios';
import { getProfile } from '../Redux/Slices/ProfileSlice';
import { BaseUrl } from '../Variables';


function Header({item}) {
    const [showVideo, setShowVideo] = useState(false)
    const [muted, setMuted] = useState(true)
    const videoRef = useRef(null);
    
    useEffect(() => {
        setTimeout(() => {
            if (videoRef?.current) {
                setShowVideo(true)
                videoRef?.current?.play();
            }
        }, 3000);
    }, []);


    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
    
        const formattedH = h > 0 ? `${h}:` : '';
        const formattedM = h > 0 ? String(m).padStart(2, '0') : m;
    
        return `${formattedH}h ${formattedM}m`;
    };

    const [duration, setDuration] = useState('')

    
    useEffect(() => {
        const videoElement = document.createElement('video');
        videoElement.style.display = 'none';
        videoElement.src = item?.trailer; 
    
        const handleLoadedMetadata = () => {
          const durationInSeconds = videoElement.duration;
          const formattedDuration = formatTime(durationInSeconds);
          setDuration(formattedDuration)
          videoElement.remove();
        };
    
        videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
        document.body.appendChild(videoElement);
    
        return () => {
          videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
          videoElement.remove();
        };
    }, [item]);

    const dispatch = useDispatch()
    // console.log(item.trailer.);




    useEffect(() => {
        const elements = document.querySelectorAll('.slide-up-element');
        elements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('visible');
          }, index * 60); // Stagger by 100ms for each element
        });
    }, []);


    const userId = useSelector(state => state.user.profile.id)

    const AddToWatchList = async () => {
        try {
          let response = await axios.post(`${BaseUrl}/series/${userId}/favorites/${item?.id}`);
          console.log(response);
          
          if (response.status === 200) {
            dispatch(getProfile());
          } 
          if(response.response.status === 500) {
            // If the series API call doesn't return 200, try adding to movies
            response = await axios.post(`${BaseUrl}/movies/${userId}/favorites/${item?.id}`);
            console.log(response);
            
            if (response.status === 200) {
              dispatch(getProfile());
            } else {
              console.error('Failed to add to watchlist');
            }
          }
        } catch (err) {
          console.error('An error occurred while adding to watchlist:', err);
        }
    };



  return (
    <header style={{ backgroundImage: `url(${item?.bgimage})`}} className=' h-screen Header flex items-center'>
        <video ref={videoRef} muted={muted} className='w-full relative object-cover h-full' src={item?.trailer}  poster={item?.bgimage} />
        <div className=' absolute justify-between top-0 left-0 px-20 GradientTop h-full w-full flex items-end pb-40'>
            <div className=' w-1/3'>
                <img src={item?.logoimage} alt='logo' className='w-full slide-up-element' />
                <div className='flex space-x-2 items-center mt-14 slide-up-element '>
                    <p className='opacity-80'> {item?.year} </p> <FaCircle size={6} className='opacity-80' />
                    <p className='opacity-80'> {duration} </p> <FaCircle size={6} className='opacity-80' />
                    <Link to={`/networks/${item?.network?.id}`} className='hover:text-blue-400 opacity-80 hover:opacity-100 hover:scale-105 transition-all'> {item?.network?.name} </Link> 
                </div>
                <p className='mt-6 opacity-80 slide-up-element'>
                    {item?.description}
                </p>
                <div className='flex space-x-2 slide-up-element items-center mt-6'>
                    {item?.genres?.map((item,key)=>(
                        <div key={key} className='flex items-center  transition-all'>
                            <Link to={`/gendres/${item?.id}`} className='hover:opacity-100 transition-all opacity-80 hover:text-blue-400 hover:scale-105'> {item?.title}  </Link> 
                            {key !== -1 && <PiLineVertical size={22} />}
                        </div>
                    ))}  
                </div>
                <div className='mt-10 flex items-stretch space-x-4 slide-up-element'>
                    <button onClick={()=> dispatch(open(item))} className='flex items-center space-x-2 font-medium bg-gray-400 bg-opacity-25 transition-all hover:scale-105 hover:bg-opacity-40 rounded-md justify-center py-4 w-3/4'> 
                        <FaPlay />
                        <p> Watch Now </p> 
                    </button>
                    <button onClick={AddToWatchList} className='bg-gray-400 bg-opacity-25 transition-all hover:scale-105 hover:bg-opacity-40 rounded-md px-6'> 
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