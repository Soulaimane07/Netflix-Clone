import React, { useState } from 'react'
import { GetGendres } from '../Functions'
import Gendre from './Gendre'

function Gendres() {
    let gendres = GetGendres()
    const [hover, setHover] = useState(false)

  return (
    <div>
        <ul className='flex items-stretch space-x-3 px-16 mt-4'>
            {gendres?.map((item,key)=>(
              key < 5 &&
                <Gendre item={item} key={key} id={key} hover={hover} setHover={setHover} />
            ))}   
        </ul>
    </div>
  )
}

export default Gendres