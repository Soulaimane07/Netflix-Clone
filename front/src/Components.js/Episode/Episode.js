import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { open } from '../Redux/Slices/WatchSlice';

function Episode({data, season, episode}) {
  const dispatch = useDispatch()

  useEffect(() => {
    const elements = document.querySelectorAll('.slide-up-element');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, index * 60); // Stagger by 100ms for each element
    });
  }, []);


  return (
    <button onClick={()=> dispatch(open(data))} className='slide-up-element flex items-start space-x-6 Episode text-left rounded-sm w-auto'>
        <img src={data.cardimage} className='w-60 rounded-md transition-all' alt='' />
        <div className='py-1'>
            <h2 className=' font-medium text-xl mb-3'> S{season} E{episode} - {data.title ? data.title : "Episode " + episode } </h2>
            <p className='w-2/3 opacity-60'> {data.description} </p>
        </div>
    </button>
  )
}

export default Episode