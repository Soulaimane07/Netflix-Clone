import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Bottom from './Bottom';
import { useSelector } from 'react-redux';

function Watch() {
  const movie = useSelector(state => state.watch.data);
  const videoRef = useRef(null);

  const [showControls, setShowControls] = useState(true);
  const handleMouseEnter = () => setShowControls(true);
  const handleMouseLeave = () => setShowControls(false);



  useEffect(() => {
    const video = videoRef.current;
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMuteToggle = () => {
    const isMuted = !videoRef.current.muted;
    videoRef.current.muted = isMuted;
    setMuted(isMuted);
  
    if (isMuted) {
      setVolume(0);
    } else {
      setVolume(videoRef.current.volume);
    }
  };
  

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0) {
      setMuted(false);
    }
    if(newVolume === 0){
      setMuted(true)
    }
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const fullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) { // Firefox
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) { // Chrome, Safari, Opera
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { // IE/Edge
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <div 
      className='fixed z-50 top-0 bottom-0 left-0 bg-primary w-full h-screen text-white flex flex-col justify-between'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}  
    >
      <div className={`w-full h-screen transition-opacity duration-300`}>
        <video 
          ref={videoRef} 
          src={movie?.trailer} 
          autoPlay={true} 
          muted={muted} 
          className='relative w-full h-screen object-cover' 
          onClick={handlePlayPause}
        />

        <div className={`${showControls | !isPlaying ? 'opacity-100' : 'opacity-0'} transition-all`}>
          <Header title={movie?.title} />
          <Bottom data={movie} handlePlayPause={handlePlayPause} isPlaying={isPlaying} duration={duration} currentTime={currentTime} handleSeek={handleSeek} handleMuteToggle={handleMuteToggle} muted={muted} volume={volume} handleVolumeChange={handleVolumeChange} fullscreen={fullscreen} />
        </div>
      </div>
    </div>
  );
}

export default Watch;









/*
  const profile = useSelector(state => state.user.profile.id);

  const [lastPosition, setLastPosition] = useState(0);


// const TrackWatching = (currentTime) => {
  //   axios.post(`${BaseUrl}/userviewing`, {
  //     "profileId": profile,
  //     "contentType": "movie",
  //     "contentId": movie?.id,
  //     "episodeId": null,
  //     "startedAt": new Date().toISOString(), // Use ISO format
  //     "durationWatched": currentTime, // The current position of the video
  //     "finished": false // Set to true when the user finishes the content
  //   })
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });
  // };

  // const handleTimeUpdate = () => {
  //   if (videoRef.current) {
  //     const currentTime = videoRef.current.currentTime;
  //     setLastPosition(currentTime);
  //   }
  // };

  // const handlePause = () => {
  //   if (videoRef.current) {
  //     TrackWatching(videoRef.current.currentTime);
  //   }
  // };

  // const handleEnd = () => {
  //   if (videoRef.current) {
  //     TrackWatching(videoRef.current.currentTime);
  //   }
  // };

  // useEffect(() => {
  //   if (profile && movie) {
  //     // Start tracking when the video starts playing
  //     TrackWatching(lastPosition);
  //   }
    
  //   const videoElement = videoRef.current;
    
  //   if (videoElement) {
  //     videoElement.addEventListener('timeupdate', handleTimeUpdate);
  //     videoElement.addEventListener('pause', handlePause);
  //     videoElement.addEventListener('ended', handleEnd);
      
  //     return () => {
  //       videoElement.removeEventListener('timeupdate', handleTimeUpdate);
  //       videoElement.removeEventListener('pause', handlePause);
  //       videoElement.removeEventListener('ended', handleEnd);
  //     };
  //   }
  // }, [profile, movie]);

  */