import React from 'react'
import { GetGendres } from '../Functions'
import Gendre from './Gendre'

function Gendres() {
    let gendres = GetGendres()

  return (
    <div>
        <ul className='flex items-stretch space-x-3 px-16 mt-4'>
            {gendres?.map((item,key)=>(
                <Gendre item={item} key={key} />
            ))}   
        </ul>
    </div>
  )
}

export default Gendres