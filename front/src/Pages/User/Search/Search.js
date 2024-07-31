import React from 'react'
import { useSelector } from 'react-redux'
import { GetMovies } from '../../../Components.js/Functions'
import SearchWork from '../../../Components.js/Work/SearchWork'

function Search() {
    let searchTerm = useSelector(state => state.search.text)
    
    let movies = GetMovies()
    // const [products, setProducts] = useState([])

    // useEffect(()=>{
    //     axios.get(`http://15.237.160.116:8000/api/searchproducts/${searchTerm}/`)
    //         .then((res)=> {
    //             setProducts(res.data)
    //             console.log(res.data)
    //         })
    //         .catch((err)=> {
    //             console.error(err);
    //         })
    // }, [searchTerm])

  return (
    <div className=' bg-primary fixed top-0 w-full h-full text-white pt-20 overflow-y-scroll pb-80'>
        <h1 className=' text-center text-xl font-medium'> {searchTerm} </h1>
        <ul className=' grid grid-cols-4 gap-8 px-40 mt-10'>
            {movies?.map((item,key)=>(
                <SearchWork item={item} key={key} />
            ))} 
        </ul>
    </div>
  )
}

export default Search