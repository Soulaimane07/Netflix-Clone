import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { open, search } from '../../../Components.js/Redux/Slices/SearchSlice';
import { useDispatch } from 'react-redux';


function SearchBox() {
    const [hover, setHover] = useState(false)
    
    const [searchTerm, setSearchTerm] = useState("")
    console.log(searchTerm);

    const dispatch = useDispatch()

    useEffect(()=> {
      const debounceSearch = setTimeout(() => {
          dispatch(search(searchTerm));
      }, 200); 

      return () => clearTimeout(debounceSearch);
    }, [searchTerm, dispatch])

  return (
    <div className={`${hover ? 'border-opacity-0  px-3 py-1.5 bg-primary bg-opacity-40' : ' border-transparent bg-transparent px-3 py-1.5'} flex text-white  border-2 rounded-md items-center transition-all`}>
        <input onChange={(e)=> setSearchTerm(e.target.value)} placeholder='Series, movies and more' type='search' className={`${hover ? 'inline' : 'hidden'} bg-transparent border-none transition-all outline-none px-2`} />
        <IoSearch 
            size={26} 
            onClick={()=> setHover(!hover)}
            className=' cursor-pointer hover:scale-110 transition-all opacity-80'
        />
    </div>
  )
}

export default SearchBox