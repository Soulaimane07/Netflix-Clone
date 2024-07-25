import React from 'react'
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { close, open } from '../../../Components.js/Redux/Slices/WatchSlice';

function Header({title}) {
    const dispatch = useDispatch()

  return (
    <div className='flex absolute top-0 w-full space-x-14 px-20 pt-10 items-center'>
        <button onClick={()=> dispatch(close())} className=' hover:scale-125 transition-all'> <BsArrowLeft size={26} /> </button>
        <h2 className=' font-medium text-xl'>{title}</h2>
    </div>
  )
}

export default Header