import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../Components.js/Redux/Slices/UserSlice'
import { Link } from 'react-router-dom'
import { logoutProfile } from '../../../Components.js/Redux/Slices/ProfileSlice'

function Header({user}) {
    const dispatch = useDispatch()

    const Logout = () => {
        dispatch(logoutProfile())
        dispatch(logout())
    }

  return (
    <div className='text-mywhite px-16 flex items-center justify-between'>
        <div>
            <h1 className='font-bold text-3xl'> {user.fname} {user.lname} </h1>
            <p className=' opacity-60 mt-2 text-xl'> {user.email} </p>
        </div>

        <div className='space-x-4'>
            <button className='hover:scale-110 transition-all'>
                <Link 
                    to="/subscribe"
                    className='bg-myorange hover:bg-myorange transition-all px-20 py-3 font-medium rounded-md'
                    > 
                    Subscribe
                </Link>
            </button>
            <button 
                onClick={Logout}
                className='bg-gray-500 bg-opacity-50 hover:bg-opacity-40 hover:scale-110 transition-all px-20 py-3 font-medium rounded-md'
                > 
                Log out 
            </button>
        </div>
    </div>
  )
}

export default Header