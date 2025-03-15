import React from 'react'

function Header({network}) {
  return (
    <div style={{ backgroundImage: `url(${network?.bgurl})`}}  className='Header NetworkHead '>
        <div className='NetworkHeadGrad  w-full h-full flex justify-center items-end'>
            <div className='w-80 '>
                {network && <img src={network?.logourl} className='w-full  object-cover' alt='network' />}
            </div>
        </div>
    </div>
  )
}

export default Header