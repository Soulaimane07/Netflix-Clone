import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { close } from '../Redux/Slices/SearchSlice';
import { FaCircle } from "react-icons/fa";

function SearchWork({item}) {
    useEffect(() => {
        const elements = document.querySelectorAll('.slide-up-element');
        elements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('visible');
          }, index * 60); // Stagger by 100ms for each element
        });
    }, []);

    const dispatch = useDispatch()

  return (
    <li className='slide-up-element mb-6 SearchItem'>
        <Link onClick={()=> dispatch(close())} to={`/work/${item?.video ? 'movie' : 'serie'}/${item?.id}`}>
        
            <div className='w-72  transition-all'>
                <div className='image'> <img src={item?.cardimage} className='rounded-md' alt={item?.title} /> </div>
                <h2 className='mt-3 font-medium px-3'> {item.title} </h2>
                <div className=' opacity-40 text-sm mt-1 px-3 space-x-2 flex items-center'> 
                    <span> {item.year} </span> <i> <FaCircle size={6} className='mt-0.5' /> </i> 
                    <span> {item.network.name} </span> <i> <FaCircle size={6} className='mt-0.5' /> </i>
                    {item.genres.map((itemm,key)=>(
                        key < 2 && <span key={key} className='flex items-center space-x-2'>  {itemm.title} </span>
                    ))} 
                </div>
            </div>

        </Link>
    </li>
  )
}

export default SearchWork