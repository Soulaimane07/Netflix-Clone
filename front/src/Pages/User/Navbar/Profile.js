import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Profile() {
  const profile = useSelector(state => state.user.profile)

  return (
    <Link to="/profile" className=' transition-all hover:bg-white rounded-full p-0.5 hover:scale-110'>
        <img src={profile.profile} className='w-12' alt='profile' />
    </Link>
  )
}

export default Profile