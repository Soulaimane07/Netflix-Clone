import React, { useEffect } from 'react'
import { FaCircle } from 'react-icons/fa';
import { PiLineVertical } from 'react-icons/pi';

function HeaderSkeleton() {
    useEffect(() => {
        const elements = document.querySelectorAll('.slide-up-element');
        elements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('visible');
          }, index * 60); // Stagger by 100ms for each element
        });
    }, []);

  return (
    <div className=' absolute justify-between top-0 left-0 px-20 GradientTop h-full w-full flex items-end pb-28'>
            <div className=' w-1/3 opacity-60'>
                <div className="slide-up-element flex items-center animate-pulse justify-center w-full h-20 sm:w-96 rounded-md bg-gray-700">
                    <svg className="w-10 h-4 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    </svg>
                </div>
                <div className='flex space-x-2 animate-pulse items-start  mt-14 slide-up-element '>
                    <div className="h-2 w-20 rounded-full bg-gray-700 mb-2.5"></div> <FaCircle size={6} className='opacity-80 text-gray-700' />
                    <div className="h-2 w-20 rounded-full bg-gray-700 mb-2.5"></div> <FaCircle size={6} className='opacity-80 text-gray-700' />
                    <div className="h-2 w-20 rounded-full bg-gray-700 mb-2.5"></div> <FaCircle size={6} className='opacity-80 text-gray-700' />
                    <div className="h-2 w-20 rounded-full bg-gray-700 mb-2.5"></div>
                </div>
                <div className='mt-6 opacity-80 animate-pulse slide-up-element'>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                </div>
                <div className='flex space-x-2 animate-pulse slide-up-element items-start mt-6'>
                    <div className="h-2 w-20 rounded-full bg-gray-700 mb-2.5"></div> <PiLineVertical size={22} className='opacity-80 text-gray-700' />
                    <div className="h-2 w-20 rounded-full bg-gray-700 mb-2.5"></div> <PiLineVertical size={22} className='opacity-80 text-gray-700' />
                    <div className="h-2 w-20 rounded-full bg-gray-700 mb-2.5"></div> <PiLineVertical size={22} className='opacity-80 text-gray-700' />
                    <div className="h-2 w-20 rounded-full bg-gray-700 mb-2.5"></div>
                </div>
                <div className='mt-10 flex animate-pulse items-stretch space-x-4 slide-up-element'>
                    <div className="flex items-center justify-center w-full h-12 rounded-md bg-gray-700">
                        <svg className="w-10 h-4 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        </svg>
                    </div>
                    <div className="flex items-center justify-center w-16 h-12  rounded-md bg-gray-700">
                        <svg className="w-10 h-4 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        </svg>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default HeaderSkeleton
