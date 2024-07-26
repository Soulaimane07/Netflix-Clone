import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Work({item}) {

  useEffect(() => {
    const elements = document.querySelectorAll('.slide-up-element');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, index * 60); // Stagger by 100ms for each element
    });
  }, []);

  return (
    <li className='slide-up-element'>
        <Link to={`/work/${item?.id}`}>
        <div className=' overflow-hidden rounded-md w-72 hover:scale-105 transition-all'>
            <img src={item?.cardimage} className='w-full h-full object-cover' alt={item?.title} />
        </div>
        </Link>
    </li>
  )
}

export default Work