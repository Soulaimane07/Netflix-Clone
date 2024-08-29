import React from 'react'

function Footer() {
  return (
    <div className='bg-primary text-mywhite p-10 grid grid-cols-4 px-40 pb-20'>
        <div className=''>
            <h1> Company </h1>
            <ul className=' opacity-60 mt-3 space-y-1'>
                <li>Supported Devices</li>
                <li>Internet based Ads</li>
            </ul>
        </div>
        <div className=''>
            <h1> View Website in </h1>
            <ul className=' opacity-60 mt-3 space-y-1'>
                <li>English</li>
                <li>Francais</li>
            </ul>
        </div>
        <div className=''>
            <h1> Need Help? </h1>
            <ul className=' opacity-60 mt-3 space-y-1'>
                <li>Help</li>
                <li>Feedback</li>
            </ul>
        </div>
    </div>
  )
}

export default Footer