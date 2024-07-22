import { Link } from 'react-router-dom'

function Gendre({item, id, hover, setHover}) {
  

  return (
    <Link 
      to={`/gendres/${item.id}`} 
      onMouseEnter={()=> setHover(id)} 
      onMouseLeave={()=> setHover(false)}
      className='w-64 h-28 hover:scale-105 flex items-center overflow-hidden transition-all bg-gray-400 bg-opacity-25 rounded-md'
    >
        {id === hover 
          ? <img src={item.image} alt='genre' className=' object-cover w-full h-full' />
          : <h2 className='pb-4 pl-6 pt-16 font-medium text-lg'> {item.title} </h2> 
        }
    </Link>
  )
}

export default Gendre