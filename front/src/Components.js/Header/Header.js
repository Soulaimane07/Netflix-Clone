import React, { useEffect, useRef, useState } from 'react'
import { FaCircle } from "react-icons/fa";
import { PiLineVertical } from "react-icons/pi";
import { FaPlay, FaPlus, FaCheck } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { IoVolumeMuteOutline } from "react-icons/io5";
import { GoUnmute } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { open } from '../Redux/Slices/WatchSlice';
import axios from 'axios';
import { getProfile, getWatchlist } from '../Redux/Slices/ProfileSlice';
import { BaseUrl } from '../Variables';
import HeaderSkeleton from './HeaderSkeleton';
import Spinner from '../Spinner';

function Header({item, type, loading}) {
    const [showVideo, setShowVideo] = useState(false)
    const [muted, setMuted] = useState(true)
    const videoRef = useRef(null);
    
    useEffect(() => {
        setTimeout(() => {
            if (videoRef?.current) {
                setShowVideo(true)
                try {
                    videoRef?.current?.play()
                } catch (error) {
                    console.error(error);
                }
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




    useEffect(() => {
        const elements = document.querySelectorAll('.slide-up-element');
        elements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('visible');
          }, index * 60); // Stagger by 100ms for each element
        });
    }, [item, loading]);


    
    const userId = useSelector(state => state.user.profile.id)

    const [addedLoading, setAddedLoading] = useState(false)
    
    const AddToWatchList = async () => {
        setAddedLoading(true)

        if(type === "movie"){
            await axios.post(`${BaseUrl}/movies/${userId}/favorites/${item?.id}`)
                .then(()=>{
                    dispatch(getWatchlist(userId)).then(()=>{
                        setAddedLoading(false)
                    })
                })
                .catch(()=> {
                    setAddedLoading(false)
                })
        }
        if(type === "serie"){
            await axios.post(`${BaseUrl}/series/${userId}/favorites/${item?.id}`)
                .then(()=>{
                    dispatch(getWatchlist(userId)).then(()=>{
                        setAddedLoading(false)
                    })
                })
                .catch(()=> {
                    setAddedLoading(false)
                })
        }
    };

    const RemoveFromWatchList = async () => {
        setAddedLoading(true)

        if(type === "movie"){
            await axios.delete(`${BaseUrl}/movies/${userId}/favorites/${item?.id}`)
                .then(()=>{
                    dispatch(getWatchlist(userId)).then(()=>{
                        setAddedLoading(false)
                    })
                })
                .catch(()=> {
                    setAddedLoading(false)
                })
        }
        if(type === "serie"){
            await axios.delete(`${BaseUrl}/series/${userId}/favorites/${item?.id}`)
                .then(()=>{
                    dispatch(getWatchlist(userId)).then(()=>{
                        setAddedLoading(false)
                    })
                })
                .catch(()=> {
                    setAddedLoading(false)
                })
        }
    }




    
    const [hello, setHello] = useState(false);

    const profile = useSelector(state => state.profile);
    

    const IsAdded = () => {
        return !!profile.watchlist?.find(obj => obj.id === item.id);
    };

    useEffect(() => {
        setHello(IsAdded());
    }, [profile, item]);

    

  return (
    <header style={loading ? {backgroundColor: "black"} :{ backgroundImage: `url(${item?.bgimage})`}} className=' h-screen Header flex items-center'>
        {loading 
            ?
                (<HeaderSkeleton />)
            :
                item && (
                    <>
                        <video ref={videoRef} muted={muted} className='w-full relative object-cover h-full' src={item?.trailer}  poster={item?.bgimage} />
                        <div className=' absolute justify-between top-0 left-0 px-20 GradientTop h-full w-full flex items-end pb-28'>
                            <div className=' w-1/3'>
                                <img src={item?.logoimage} alt='logo' className='w-full slide-up-element' />
                                <div className='flex space-x-2 items-center mt-14 slide-up-element '>
                                    <p className='opacity-80'> {item?.year} </p> <FaCircle size={6} className='opacity-80' />
                                    <p className=' bg-white bg-opacity-30 text-opacity-80 rounded-sm px-1'> {item?.rating} </p> <FaCircle size={6} className='opacity-80' />
                                    <p className='opacity-80'> {type === "movie" ? duration : item?.seasons + " Seasons"} </p> <FaCircle size={6} className='opacity-80' />
                                    <Link to={`/networks/${item?.network?.id}`} className='hover:text-myorange opacity-80 hover:opacity-100 hover:scale-105 transition-all'> {item?.network?.name} </Link> 
                                </div>
                                <p className='mt-6 opacity-80 slide-up-element'>
                                    {item?.description}
                                </p>
                                <div className='flex space-x-2 slide-up-element items-center mt-6'>
                                    {item?.genres?.map((genre, key) => (
                                        <div key={key} className='flex items-center transition-all'>
                                            <Link to={`/gendres/${genre?.id}`} className='hover:opacity-100 transition-all opacity-80 hover:text-myorange hover:scale-105'>
                                                {genre?.title}
                                            </Link>
                                            {key !== item?.genres?.length - 1 && <PiLineVertical size={22} />}
                                        </div>
                                    ))}
                                </div>
                                <div className='mt-10 flex items-stretch space-x-4 slide-up-element'>
                                    <button onClick={()=> dispatch(open(item))} className='flex items-center space-x-2 font-medium bg-gray-400 bg-opacity-25 transition-all hover:scale-105 hover:bg-opacity-40 rounded-md justify-center py-4 w-3/4'> 
                                        <FaPlay />
                                        <p> {hello ? type === "movie" ? 'Start Watching' : 'Start Watching | S1 - E1'  : 'Watch Now'}  </p> 
                                    </button>
                                    <button onClick={hello ? RemoveFromWatchList : AddToWatchList} className='bg-gray-400 flex items-center space-x-4 bg-opacity-25 transition-all hover:scale-105 hover:bg-opacity-40 rounded-md px-5'> 
                                        {addedLoading ? <Spinner />  : hello ? <FaCheck size={18} /> : <FaPlus size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button className='hover:scale-105 transition-all opacity-50 bg-transparent hover:opacity-90' onClick={()=> setMuted(!muted)}>
                                {showVideo && (!muted ? <GoUnmute size={40} className='bg-transparent' /> : <IoVolumeMuteOutline size={40} className='bg-transparent' />)}
                            </button>
                        </div>
                    </>
                )
        }
    </header>
  )
}

export default Header