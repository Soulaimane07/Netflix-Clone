import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../Components.js/Redux/Slices/UserSlice'
import { Link } from 'react-router-dom'

function Header({user}) {
    const dispatch = useDispatch()

  return (
    <div className='text-white flex items-center justify-between'>
        <div>
            <h1 className='font-bold text-3xl'> {user.fname} {user.lname} </h1>
            <p className=' opacity-60 mt-2 text-xl'> {user.email} </p>
        </div>

        <div className='space-x-4'>
            <button className='hover:scale-110 transition-all'>
                <Link 
                    to="/subscribe"
                    className='bg-blue-600 hover:bg-blue-500 transition-all px-20 py-3 font-medium rounded-md'
                    > 
                    Subscribe
                </Link>
            </button>
            <button 
                onClick={()=> dispatch(logout())}
                className='bg-gray-500 bg-opacity-50 hover:bg-opacity-40 hover:scale-110 transition-all px-20 py-3 font-medium rounded-md'
                > 
                Log out 
            </button>
        </div>
    </div>
  )
}

export default Header