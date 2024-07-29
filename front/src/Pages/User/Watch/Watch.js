import React, { useRef } from 'react'
import Header from './Header'
import Bottom from './Bottom'
import { useSelector } from 'react-redux'

function Watch() {
  let movie = useSelector(state => state.watch.data)

  const videoRef = useRef(null);

  const fullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) { // Firefox
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { // IE/Edge
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <div className='fixed z-50 top-0 bottom-0 left-0 bg-primary w-full h-screen text-white flex flex-col justify-between'>

        <div className='  w-full h-screen '>
            <video  ref={videoRef} src={movie?.video ? movie?.video : movie?.trailer} autoPlay={true} muted={true} className=' relative w-full h-screen object-cover' />
            
            <Header title={movie?.title} />

            <Bottom data={movie} fullscreen={fullscreen} />
        </div>

    </div>
  )
}

export default Watch