import React from 'react'
import { useSelector } from 'react-redux'
import SearchWork from '../../../Components.js/Work/SearchWork'
import { SearchFun } from '../../../Components.js/Functions'

function Search() {
    let searchTerm = useSelector(state => state.search.text)
    
    let works = SearchFun(searchTerm)

  return (
    <div className=' bg-primary fixed top-0 w-full h-full text-white pt-20 overflow-y-scroll pb-80'>
        <h1 className=' text-center text-4xl font-medium'> {searchTerm} </h1>
        <ul className=' grid grid-cols-4 gap-8 px-40 mt-10'>
            {works?.movies?.map((item,key)=>(
                <SearchWork item={item} key={key} />
            ))} 
            {works?.series?.map((item,key)=>(
                <SearchWork item={item} key={key} />
            ))} 
        </ul>
    </div>
  )
}

export default Search