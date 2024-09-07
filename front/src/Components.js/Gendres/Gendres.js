import React, { useState } from 'react'
import Gendre from './Gendre'
import { useSelector } from 'react-redux'

function Gendres() {
    let gendres = useSelector(state => state.genres.data)
    const [hover, setHover] = useState(false)

  return (
      <ul className='SCROLL mt-1 px-16 flex space-x-3 overflow-hidden overflow-x-scroll py-6 pt-2 scroll-smooth '>
          {gendres.map(item => (
              <Gendre item={item} hover={hover} setHover={setHover} />
          ))}   
      </ul>
  )
}

export default Gendres