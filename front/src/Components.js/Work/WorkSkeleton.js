import React, { useEffect } from 'react'

function WorkSkeleton() {
  useEffect(() => {
    const elements = document.querySelectorAll('.slide-up-element');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, index * 60); // Stagger by 100ms for each element
    });
  }, []);

  return (
    <li className='animate-pulse slide-up-element'>
        <div className=' overflow-hidden rounded-md w-72 h-40 bg-gray-700 hover:scale-105 transition-all'>
        </div>
    </li>
  )
}

export default WorkSkeleton